export const render = (d, selector = 'body') => {
  const data = JSON.parse(JSON.stringify(d))
  let div
  const hasDOM = !!document.querySelector('.three-cabinet-info')
  if (document.querySelector('.three-cabinet-info')) {
    div = document.querySelector('.three-cabinet-info')
  } else {
    div = document.createElement('div')
  }
  div.className = 'three-cabinet-info'
  div.innerHTML = ''
  let html = ''
  if (Array.isArray(data)) {
    data.forEach(item => {
      item.wd = (item.wd + Math.random() * 10).toFixed(1)
      item.sd = (item.sd + Math.random() * 10).toFixed(1)
      html += `<div class="info-item">
                <ul>
                  <li>${item.name}</li>
                  <li><span><img src="/js/plugin/cabinet/images/xbr-icon-cld-wd.svg"/> ${item.wd}℃</span></li>
                  <li><span><img src="/js/plugin/cabinet/images/xbr-icon-cld-sd.svg"/> ${item.sd}%</span></li>
                </ul>
              </div>
            `
    })
    div.innerHTML = html
    if (!hasDOM) {
      document.querySelector(selector).appendChild(div)
    }
  }
}