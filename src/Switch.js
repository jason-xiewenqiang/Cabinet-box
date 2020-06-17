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

    // const switchTexture = loadTexture('images/rack_inside.png', () => { sceneInstance.render() })
    const switchGeo = new THREE.BoxGeometry(24, 11.5, 36)
    const switchMat = new THREE.MeshBasicMaterial({
      color: 0x4ebaff,
      // map: switchTexture,
      opacity: 0.7,
      transparent: true,
      side: THREE.DoubleSide,
    })
    const switchBody = new THREE.Mesh(switchGeo, switchMat)
    switchBody.position.set(0, this.h, 2)

    const switchMGeo = new THREE.BoxGeometry(26.3, 12, 0.2)
    const switchMMat = new THREE.MeshBasicMaterial({
      color: 0x4ebaff,
      opacity: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    })
    const switchFaceMaterials = []
    switchFaceMaterials.push(
      switchMMat,
      switchMMat,
      switchMMat,
      switchMMat,
      new THREE.MeshBasicMaterial({
        color: 0x4ebaff,
        // map: loadTexture('images/switchboard.png', () => { sceneInstance.render() }),
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      }),
      switchMMat,
    )
    const switchFaceMat = new THREE.MeshFaceMaterial(switchFaceMaterials)
    const switchFace = new THREE.Mesh(switchMGeo, switchFaceMat)
    switchFace.position.set(0, this.h, 36 / 2 + 0.2 / 2 + 2)
    // switchGroup.add(switchBody, switchFace)
    switchGroup.add(switchBody)

    sceneInstance.scene.add(switchGroup)
  }
}

export default Switch
