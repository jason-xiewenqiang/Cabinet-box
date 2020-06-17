export const render = (d, selector = 'body') => {
  const data = JSON.parse(JSON.stringify(d))
  let div
  const hasDOM = !!document.querySelector('.cabinet-info')
  if (document.querySelector('.cabinet-info')) {
    div = document.querySelector('.cabinet-info')
  } else {
    div = document.createElement('div')
  }
  div.className = 'cabinet-info'
  div.innerHTML = ''
  let html = ''
  if (Array.isArray(data)) {
    data.forEach(item => {
      item.wd = (item.wd + Math.random() * 10).toFixed(1)
      item.sd = (item.sd + Math.random() * 10).toFixed(1)
      html += `<div class="info-item">
                <ul>
                  <li>${item.name}</li>
                  <li>温度：<span style="color: ${item.wd > 35 ? 'red' : ''};">${item.wd}</span>℃</li>
                  <li>湿度：<span style="color: ${item.sd > 35 ? 'red' : ''};">${item.sd}</span>℃</li>
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