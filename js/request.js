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