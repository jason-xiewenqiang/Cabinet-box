import { loadTexture } from './utils'
class Server {
  constructor(scene, cabinet, height) {
    this.x = cabinet.x
    this.z = cabinet.z
    this.y = 0
    this.h = height
    this.build(scene)
  }

  build(sceneInstance) {
    const serverGroup = new THREE.Group()
    serverGroup.position.set(this.x, this.y, this.z)

    const serverGEO = new THREE.BoxGeometry(24, 3.5, 36)
    const serverMat = new THREE.MeshBasicMaterial({
      color: 0x4ebaff,
      opacity: 0.7,
      transparent: true,
      side: THREE.DoubleSide,
    })
    const server = new THREE.Mesh(serverGEO, serverMat)
    server.position.set(0, this.h, 2)
    server.name = 'server'

    const serverMGeo = new THREE.BoxGeometry(26.4, 4, 0.2)
    const serverMaterials = []

    // 服务器的材质
    serverMaterials.push(serverMat, serverMat, serverMat, serverMat, serverMat, serverMat)
    serverGroup.add(server)
    sceneInstance.scene.add(serverGroup)
  }
}

export default Server