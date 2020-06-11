import { loadTexture } from './utils'

class Switch {
  constructor(sceneInstance, cabinet, height) {
    this.x = cabinet.x
    this.z = cabinet.z
    this.h = height
    this.build(sceneInstance)
  }
  build(sceneInstance) {
    const switchGroup = new THREE.Group()
    switchGroup.position.set(this.x, 0, this.z)
    
    const switchTexture = loadTexture('images/rack_inside.jpg', () => { sceneInstance.render() })
    const switchGeo = new THREE.BoxGeometry(24, 11.5, 36)
    const switchMat = new THREE.MeshBasicMaterial({
      color: 0x9AC0CD,
      map: switchTexture
    })
    const switchBody = new THREE.Mesh(switchGeo, switchMat)
    switchBody.position.set(0, this.h, 2)

    const switchMGeo = new THREE.BoxGeometry(26.3, 12, 0.2)
    const switchMMat = new THREE.MeshBasicMaterial({
      color: 0xfffff
    })
    const switchFaceMaterials = []
    switchFaceMaterials.push(
      switchMMat,
      switchMMat,
      switchMMat,
      switchMMat,
      new THREE.MeshBasicMaterial({
        map: loadTexture('images/switchboard.jpg', () => { sceneInstance.render() })
      }),
      switchMMat,
    )
    const switchFaceMat = new THREE.MeshFaceMaterial(switchFaceMaterials)
    const switchFace = new THREE.Mesh(switchMGeo, switchFaceMat)
    switchFace.position.set(0, this.h, 36 / 2 + 0.2 / 2 + 2)
    switchGroup.add(switchBody, switchFace)

    sceneInstance.scene.add(switchGroup)
  }
}

export default Switch
