var assetURL = '/api/v2/mblock/asset/list';
var timer = null;
self.addEventListener('message', function(e) {
  // console.log(e.data);
  if (e.data == 'start') {
    timer = setInterval(function() {
      var res = updateLoop()
      self.postMessage(JSON.stringify(res))
    }, 5000)
  }
  if (e.data == 'close') {
    self.close()
    clearInterval(timer)
    timer = null
  }
})

function updateLoop() {
  let assets = getAssets(assetURL);
  let mapCabinet = {}
  if (assets 
    && assets.hasOwnProperty('rows')) {
      assets.rows.forEach(row => {
        if (mapCabinet[row.rack_id]) {
          mapCabinet[row.rack_id].push(row)
        } else {
          mapCabinet[row.rack_id] = [row]
        }
      })
  }
  // console.log('mapCabinet', mapCabinet)
  return mapCabinet
}

function getAssets(url) {
  return request(url, 'GET');
}

function request(url, method) {
  var xmlhttp = new XMLHttpRequest()
  var res 
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {
        res = xmlhttp.responseText
      }
    }
  }
  xmlhttp.open(method, url, false)
  xmlhttp.send()
  if (res) {
    res = JSON.parse(res)
  }
  return res
}