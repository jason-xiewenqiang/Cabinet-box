
import Sprite from './Sprite'

/**
 * 执行渲染
 * @param {*} selector 宿主（容器）
 */
function runCabinet(selector) {

  const iScene = new Sprite({parent: selector ? document.querySelector(selector) : window})

  return iScene
}

export default runCabinet
