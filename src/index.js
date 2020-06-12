import { randomColor } from './utils'
import IScene from './IScene'
import Server from './Server'
import Cabinet from './Cabinet'
import Switch from './Switch'
import Rope from './Rope'
import Smoke from './Smoke'
// import Sense from './Sense'
import GunTypeCamera from './GunTypeCamera'

window.onload = function () {

  const config = {
    switchTop: 11.5, // 交换机距离地板的高度
    serverTop: 21.5, // 最低的服务器距离地板的高度
    serverHeight: 4, // 服务器自身高度
    serverSpacing: 2.1, // 服务器之间的间隔
    maxServerCount: 11 // 最多能存放几台服务器
  }

  const iScene = new IScene({dev: true})

  // new GunTypeCamera({scene: iScene})
  
  // 机柜
  const cabinet = new Cabinet(-32, 0, '机柜1', iScene)
  const cabinet1 = new Cabinet(0, 0, '机柜2', iScene)
  const cabinet2 = new Cabinet(32, 0, '机柜3', iScene)

  // 交换机
  new Switch(iScene, cabinet, config.switchTop)
  new Switch(iScene, cabinet1, config.switchTop)
  new Switch(iScene, cabinet2, config.switchTop)

  // 门感
  // new Sense({
  //   height: 90,
  //   scene: iScene,
  //   cabinet: cabinet
  // })
  // new Sense({
  //   height: 90,
  //   scene: iScene,
  //   cabinet: cabinet1
  // })
  // new Sense({
  //   height: 90,
  //   scene: iScene,
  //   cabinet: cabinet2
  // })

  // 烟感
  new Smoke({
    height: 90,
    scene: iScene,
    cabinet: cabinet1
  })
  new Smoke({
    height: 90,
    scene: iScene,
    cabinet: cabinet
  })
  new Smoke({
    height: 90,
    scene: iScene,
    cabinet: cabinet2
  })

  //漏水绳子
  const rope1 = new Rope({
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

  console.log('rope1', rope1)
  const target = rope1.group.children[0]
  console.log('material', target)

  setInterval(() => {
    target.material = new THREE.MeshBasicMaterial({color: randomColor()})
  }, 3000)

  // 服务器
  for (let i = 0; i < config.maxServerCount; i++) {
    new Server(iScene, cabinet, config.serverTop + i * (config.serverHeight + config.serverSpacing))
    new Server(iScene, cabinet1, config.serverTop + i * (config.serverHeight + config.serverSpacing))
    new Server(iScene, cabinet2, config.serverTop + i * (config.serverHeight + config.serverSpacing))
  }

}










