import Scene from './Scene'
import Cabinet from './Cabinet'

/**
 * @description 入口
 * @author 谢文强
 * @param {String} selector 选择器 { css-class, css-id, body }
 * @param {Object} options 选传数据对象
 * @param {Function} callback 回调
 * @returns {Scene} scene 场景对象
 */
function init(selector, options, callback) {
  const Is = new Scene(null, false)
  return { Is }
}

var context;
var assetURL = '/api/v2/mblock/asset/list';
var cabinetURL = '/api/v2/mblock/asset/allrack';
var defaultSetting = {
  x: 0,
  y: 0,
  z: 0,
  name: '',
  resource_id: '',
  width: 30,
  length: 40,
  height: 100
}
var allCabinets = [];
var worker = null;
var mapCabinet = {}
window.onload = async function() {
  $('.loading').show()
  const cabinets = await getCabinet(cabinetURL);
  const assets = await getAssets(assetURL);
  const settings = mapAssetToCabinet(cabinets, assets);
  $('.loading').hide()
  $('.rotate-btn').show()
  context = init()
  settings.forEach((setting, index) => {
    // first参数加入 -- 只有第一个机柜才会有摄像头和漏水绳子
    let cab = new Cabinet({first: index == 0 ? true : false, ...setting})
    allCabinets.push(cab)
    mapCabinet[cab.resource_id] = index
    context.Is.scene.add(cab.group)
  })

  worker = new Worker('./js/server.worker.js')

  worker.postMessage('start')
  worker.onmessage = (event) => {
    var res = JSON.parse(event.data)
    if (res) {
      update(res)
    }
  }
  $('.rotate-btn').on('click', () => {
    if (context && context.Is) {
      $('.rotate-btn').text(context.Is.rotate ? '旋转' : '停止旋转')
      context.Is.setRotate(!context.Is.rotate)
    }
  })
}

window.onbeforeunload = function() {
  context.Is.destroyed()
  worker.postMessage('close')
  worker.terminate()
  allCabinets = null
  worker = null
  mapCabinet = null
  defaultSetting = null
  context = null
}

function update(org) {
  var needRemove = []
  for (var k in org) {
    var cabinet = allCabinets[mapCabinet[k]]
    if (!cabinet) return 
    var newIds = org[k].map(it => (it.resource_id))
    var oldIds = cabinet.options.childIDs.split(',').filter(it => (!!it))
    oldIds.forEach(id => {
      if (newIds.indexOf(id) == -1) {
        needRemove(id)
      }
    })
    org[k].forEach(it => {
      if (oldIds.indexOf(it.resource_id) == -1) {
        cabinet.addAsset(it)
      }
    })
    cabinet.removeAsset(needRemove)
  }
}



function getCabinet(url) {
  let cabinets = []
  $.ajax({
    url: url,
    type: "GET",
    async: false,
    contentType: "*/*;charset=UTF-8",
    processData: false,
    success: res => {
      cabinets = res
    },
    error: error => {
      console.error(error);
    }
  })
  return cabinets
}

function getAssets(url) {
  let assets = []
  $.ajax({
    url: url,
    type: "GET",
    async: false,
    contentType: "*/*;charset=UTF-8",
    processData: false,
    success: res => {
      assets = res
    },
    error: error => {
      console.error(error);
    }
  })
  return assets
}

function mapAssetToCabinet(cabinets, assets) {
  let cabinetSettings = []
  let mapObject = {}
  if (cabinets 
    && cabinets.hasOwnProperty('racks') 
    && Array.isArray(cabinets.racks) 
    && assets 
    && assets.hasOwnProperty('rows')
    && Array.isArray(assets.rows)) {
    let len = cabinets.racks.length
    let startPointX = - 18 * Math.round(len / 2) + (len % 2 === 0 ? 9 : 18);
    cabinets.racks.forEach((item, index) => {
      delete item.free_u
      const setting = Object.assign({}, defaultSetting, item, {x: startPointX + 18 * index})
      mapObject[setting.resource_id] = index
      setting.resource_id = item.resource_id
      setting[setting.resource_id] = []
      setting.childIDs = ''
      cabinetSettings.push(setting)
    }) 
    assets.rows.forEach(asset => {
      let pIndex = mapObject[asset.rack_id]
      cabinetSettings[pIndex][asset.rack_id].push(asset)
      cabinetSettings[pIndex].childIDs += asset.resource_id + ','
    })
    console.log('cabinetSettings', cabinetSettings)
  }
  return cabinetSettings
}

export default init
