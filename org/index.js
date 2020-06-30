import Scene from './Scene'
import Cabinet from './Cabinet'
import Label from './Label'

/**
 * @description 入口
 * @author 谢文强
 * @param {String} selector 选择器 { css-class, css-id, body }
 * @param {Object} options 选传数据对象
 * @param {Function} callback 回调
 * @returns {Scene} scene 场景对象
 */
function init(selector, options, callback) {
  const count = 3
  const Is = new Scene(null, false, count)

  // 机柜参数设置
  const cabinetSetting = {
    x: 0,
    y: 0,
    z: 0,
    name: 'cabinet1',
    id: '0_528',
    width: 30,
    length: 40,
    height: 100,
    server: {
      count: 10,
      h: 8,
      thickness: 2
    },
    switch: {
      count: 1,
      h: 8,
      thickness: 6
    }

  }

  // const box = new Label(cabinetSetting).box
  // Is.scene.add(box)

  let x = 9
  let dx = -9
  // 偶数个
  if (count % 2 === 0) {
    for (let i = 0; i < count / 2; i++) {
        cabinetSetting.x = 18 * i + x
        Is.scene.add(new Cabinet(cabinetSetting).group)
        cabinetSetting.x = - 18 * i + dx
        Is.scene.add(new Cabinet(cabinetSetting).group)
    }
  } else {
    // 奇数个
    Is.scene.add(new Cabinet(cabinetSetting).group)  // i = 0
    for (let i = 1; i < Math.fround(count/2); i++) {
      cabinetSetting.x = 18 * i
      Is.scene.add(new Cabinet(cabinetSetting).group)
      cabinetSetting.x = - 18 * i
      Is.scene.add(new Cabinet(cabinetSetting).group)
    }
  }

  return Is
}

init()
startWork()

function startWork() {
  const worker = new Worker('./js/server.worker.js')
  worker.postMessage('getResource')
  worker.onmessage = function (event) {
    console.log(event)
  }
}



export default init
