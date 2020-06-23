export const renderCamera = (d, selector='body') => {
  const data = JSON.parse(JSON.stringify(d))
  let div
  const hasDOM = !!document.querySelector('.three-camera')
  if (document.querySelector('.three-camera')) {
    div = document.querySelector('.three-camera')
  } else {
    div = document.createElement('div')
  }
  div.className = 'three-camera'
  div.innerHTML = ''
  let html = `<img src='/js/plugin/cabinet/images/myCamera.png'/>`
  
  div.innerHTML = html
  if (!hasDOM) {
    document.querySelector(selector).appendChild(div)
  }
}