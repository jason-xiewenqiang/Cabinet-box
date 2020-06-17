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

    // const serverTexture = loadTexture('images/rack_inside.png', () => { sceneInstance.render() })
    const serverGEO = new THREE.BoxGeometry(24, 3.5, 36)
    const serverMat = new THREE.MeshBasicMaterial({
      color: 0x4ebaff,
      // map: serverTexture,
      opacity: 0.7,
      transparent: true,
      side: THREE.DoubleSide,
    })
    const server = new THREE.Mesh(serverGEO, serverMat)
    server.position.set(0, this.h, 2)

    const serverMGeo = new THREE.BoxGeometry(26.4, 4, 0.2)
    const serverMaterials = []


    // 服务器的材质
    serverMaterials.push(serverMat, serverMat, serverMat, serverMat, serverMat, serverMat)
    const serverMMat = new THREE.MeshFaceMaterial(serverMaterials)
    const serverMFace = new THREE.Mesh(serverMGeo, serverMMat)
    serverMFace.name = 'server'
    // serverMFace.position.set(0, this.h, 36 / 2 + 0.2 / 2 + 2)
    serverGroup.add(server, serverMFace)
    sceneInstance.scene.add(serverGroup)
  }
}

export default Server