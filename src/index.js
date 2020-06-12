import IScene from './IScene'
import Server from './Server'
import Cabinet from './Cabinet'
import Switch from './Switch'
import Rope from './Rope'

window.onload = function () {

  const config = {
    switchTop: 11.5, // 交换机距离地板的高度
    serverTop: 21.5, // 最低的服务器距离地板的高度
    serverHeight: 4, // 服务器自身高度
    serverSpacing: 2.1, // 服务器之间的间隔
    maxServerCount: 11 // 最多能存放几台服务器
  }

  const iScene = new IScene({dev: false})
  
  const cabinet = new Cabinet(-32, 0, '机柜1', iScene)
  const cabinet1 = new Cabinet(0, 0, '机柜2', iScene)
  const cabinet2 = new Cabinet(32, 0, '机柜3', iScene)
  new Switch(iScene, cabinet, config.switchTop)
  new Switch(iScene, cabinet1, config.switchTop)
  new Rope({
    y: 3,
    radius: 1,
    scene: iScene,
    cabinet: cabinet1
  })
  new Rope({
    y: 3,
    radius: 1,
    scene: iScene,
    cabinet: cabinet
  })
  new Rope({
    y: 3,
    radius: 1,
    scene: iScene,
    cabinet: cabinet2
  })
  new Switch(iScene, cabinet2, config.switchTop)
  for (let i = 0; i < config.maxServerCount; i++) {
    new Server(iScene, cabinet, config.serverTop + i * (config.serverHeight + config.serverSpacing))
    new Server(iScene, cabinet1, config.serverTop + i * (config.serverHeight + config.serverSpacing))
    new Server(iScene, cabinet2, config.serverTop + i * (config.serverHeight + config.serverSpacing))
  }

}










