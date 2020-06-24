import Scene from './Scene'
import Cabinet from './Cabinet'

/**
 * @description 入口
 * @author 谢文强
 * @param {String} selector 选择器 { css-class, css-id, body }
 * @param {Object} options 选传数据对象
 * @param {Function} callback 回调
 * @returns {Scene} scene 场景对象
 */
function init(selector, options, callback) {
  const count = 5
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
    height: 100
  }

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
    Is.scene.add(new Cabinet(cabinetSetting).group)
    for (let i = 0; i < Math.fround(count/2); i++) {
      cabinetSetting.x = 18 * i
      Is.scene.add(new Cabinet(cabinetSetting).group)
      cabinetSetting.x = - 18 * i
      Is.scene.add(new Cabinet(cabinetSetting).group)
    }
  }

  return Is
}


init()

export default init
