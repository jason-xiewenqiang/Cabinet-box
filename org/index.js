import Scene from './Scene'

/**
 * @description 入口
 * @author 谢文强
 * @param {String} selector 选择器 { css-class, css-id, body }
 * @param {Object} options 选传数据对象
 * @param {Function} callback 回调
 * @returns {Scene} scene 场景对象
 */
function init(selector, options, callback) {
  const scene = new Scene()
  return scene
}

init()

export default init
