export const renderCamera = (d, selector = 'body') => {
  const data = JSON.parse(JSON.stringify(d))
  let div
  const hasDOM = !!document.querySelector('.cabinet-camera')
  if (document.querySelector('.cabinet-camera')) {
    div = document.querySelector('.cabinet-camera')
  } else {
    div = document.createElement('div')
  }
  div.className = 'cabinet-camera'
  div.innerHTML = ''
  let html = `<img src='../images/myCamera.png'/>`
  div.innerHTML = html
  if (!hasDOM) {
    document.querySelector(selector).appendChild(div)
  }
}