import { randomColor } from './utils'
import IScene from './ISceneUmd'
import Server from './Server'
import Cabinet from './Cabinet'
import Switch from './Switch'
import Rope from './Rope'
import Smoke from './Smoke'
import { render } from './InfoPanel'
import { renderCamera } from './Camera'

window.onload = function() {
  const scene = runCabinet('body', true, (cabinet) => {
    console.log('回调执行，mmp', cabinet)
  })
}

/**
 * 执行渲染
 * @param {*} selector 宿主（容器）
 */
function runCabinet(selector, renderCabinet = true, callback) {

  const config = {
    switchTop: 11.5, // 交换机距离地板的高度
    serverTop: 21.5, // 最低的服务器距离地板的高度
    serverHeight: 4, // 服务器自身高度
    serverSpacing: 2.1, // 服务器之间的间隔
    maxServerCount: 11 // 最多能存放几台服务器
  }

  const data = [
    {name: '机柜1', wd: 30, sd: 20},
    {name: '机柜2', wd: 30, sd: 20},
    {name: '机柜3', wd: 30, sd: 20}
  ]

  const iScene = new IScene({parent: document.querySelector(selector || 'body'), control: true, callback})

  if (!renderCabinet) { return false }

  render(data, selector || 'body')
  // setInterval(() => {
  //   render(data, selector)
  // }, 3000)
  renderCamera(data,  selector ? selector : 'body')

  // 机柜
  const cabinet = new Cabinet({x: -32, z: 0, name: '机柜1', scene: iScene, id: '0_590'})
  const cabinet1 = new Cabinet({x: 0, z: 0, name: '机柜2', scene: iScene, id: '0_591'})
  const cabinet2 = new Cabinet({x: 32, z: 0, name: '机柜3', scene: iScene, id: '0_592'})

  
  // 烟感
  const smoke1 = new Smoke({ height: 90, scene: iScene, cabinet: cabinet1 })
  const smoke2 = new Smoke({ height: 90, scene: iScene, cabinet: cabinet })
  const smoke3 = new Smoke({ height: 90, scene: iScene, cabinet: cabinet2 })

  // 漏水绳子
  const rope1 = new Rope({ y: 3, radius: 1, scene: iScene, cabinet: cabinet1 })
  const rope2 = new Rope({ y: 3, radius: 1, scene: iScene, cabinet: cabinet })
  const rope3 = new Rope({ y: 3, radius: 1, scene: iScene, cabinet: cabinet2 })

  const target1 = rope1.group.children[0]
  const target2 = rope2.group.children[0]
  const target3 = rope3.group.children[0]

  const changeRope = () => {
    const mbm = new THREE.MeshBasicMaterial({color: randomColor()})
    target1.material = mbm
    target2.material = mbm
    target3.material = mbm
  }

  // setInterval(() => {
  //   changeRope()
  // }, 3000)

  // 服务器
  for (let i = 0; i < config.maxServerCount; i++) {
    new Server(iScene, cabinet, config.serverTop + i * (config.serverHeight + config.serverSpacing))
    new Server(iScene, cabinet1, config.serverTop + i * (config.serverHeight + config.serverSpacing))
    new Server(iScene, cabinet2, config.serverTop + i * (config.serverHeight + config.serverSpacing))
  }

  // 交换机
  new Switch(iScene, cabinet, config.switchTop)
  new Switch(iScene, cabinet1, config.switchTop)
  new Switch(iScene, cabinet2, config.switchTop)

  // 返回整个IScene
  return iScene
}

export default runCabinet
