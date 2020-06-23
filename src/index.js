import { randomColor } from './utils'
import IScene from './IScene'
import Server from './Server'
import Cabinet from './Cabinet'
import Switch from './Switch'
import Rope from './Rope'
import Smoke from './Smoke'
// import Sense from './Sense'
// import GunTypeCamera from './GunTypeCamera'
import { render } from './InfoPanel'
import { renderCamera } from './Camera'

window.onload = function () {
  runCabinet()
}

export default runCabinet

function runCabinet() {
  const config = {
    switchTop: 11.5, // 交换机距离地板的高度
    serverTop: 21.5, // 最低的服务器距离地板的高度
    serverHeight: 4, // 服务器自身高度
    serverSpacing: 2.1, // 服务器之间的间隔
    maxServerCount: 11 // 最多能存放几台服务器
  }

  const data = [
    {name: '机柜1', wd: 30, sd: 30},
    {name: '机柜2', wd: 30, sd: 30},
    {name: '机柜3', wd: 30, sd: 30}
  ]

  render(data)
  setInterval(() => {
    render(data)
  }, 3000)
  
  renderCamera(data)

  const iScene = new IScene({dev: false})

  // 机柜
  const cabinet = new Cabinet(-32, 0, '机柜1', iScene)
  const cabinet1 = new Cabinet(0, 0, '机柜2', iScene)
  const cabinet2 = new Cabinet(32, 0, '机柜3', iScene)

  // 交换机
  new Switch(iScene, cabinet, config.switchTop)
  new Switch(iScene, cabinet1, config.switchTop)
  new Switch(iScene, cabinet2, config.switchTop)

  // 烟感
  const smoke1 = new Smoke({
    height: 90,
    scene: iScene,
    cabinet: cabinet1
  })
  const smoke2 = new Smoke({
    height: 90,
    scene: iScene,
    cabinet: cabinet
  })
  const smoke3 = new Smoke({
    height: 90,
    scene: iScene,
    cabinet: cabinet2
  })


  const changeSmoke1 = () => {
    const mbm = new THREE.MeshBasicMaterial({color: randomColor()})
    smoke1.group.children.forEach(el => {
      el.material = mbm
    })
    setTimeout(() => {
      changeSmoke1()
    }, Math.random() * 5000)
  }
  const changeSmoke2 = () => {
    const mbm = new THREE.MeshBasicMaterial({color: randomColor()})
    smoke2.group.children.forEach(el => {
      el.material = mbm
    })
    setTimeout(() => {
      changeSmoke2()
    }, Math.random() * 5000)
  }
  const changeSmoke3 = () => {
    const mbm = new THREE.MeshBasicMaterial({color: randomColor()})
    smoke3.group.children.forEach(el => {
      el.material = mbm
    })
    setTimeout(() => {
      changeSmoke3()
    }, Math.random() * 5000)
  }

  changeSmoke2()

  // 漏水绳子
  const rope1 = new Rope({
    y: 3,
    radius: 1,
    scene: iScene,
    cabinet: cabinet1
  })
  const rope2 = new Rope({
    y: 3,
    radius: 1,
    scene: iScene,
    cabinet: cabinet
  })
  const rope3 = new Rope({
    y: 3,
    radius: 1,
    scene: iScene,
    cabinet: cabinet2
  })

  const target1 = rope1.group.children[0]
  const target2 = rope2.group.children[0]
  const target3 = rope3.group.children[0]

  const changeRope = () => {
    const mbm = new THREE.MeshBasicMaterial({color: randomColor()})
    target1.material = mbm
    target2.material = mbm
    target3.material = mbm
  }

  setInterval(() => {
    changeRope()
  }, 3000)

  // 服务器
  for (let i = 0; i < config.maxServerCount; i++) {
    new Server(iScene, cabinet, config.serverTop + i * (config.serverHeight + config.serverSpacing))
    new Server(iScene, cabinet1, config.serverTop + i * (config.serverHeight + config.serverSpacing))
    new Server(iScene, cabinet2, config.serverTop + i * (config.serverHeight + config.serverSpacing))
  }
}










