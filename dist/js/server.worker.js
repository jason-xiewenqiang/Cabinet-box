
const LOCATION_URL = 'http://192.168.3.69/api/v2/mblock/asset/allrack'

self.addEventListener('message', function (e) {
  console.log(e)
  getResource()
  self.postMessage('get your message')
}, false)

function getResource() {
  var result

  return result
}

