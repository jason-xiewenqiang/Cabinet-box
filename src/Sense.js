class Sense {
  constructor(options) {
    this.x = options.cabinet.x
    this.z = options.cabinet.z
    this.y = options.y || 0
    this.h = options.height
    this.build(options.scene)
  }

  build(sceneInstance) {
    const group = new THREE.Group()
    group.position.set(this.x, this.y, this.z)

    const material = new THREE.LineBasicMaterial({
      color: 'pink'
    })

    const geo = new THREE.BoxGeometry(4, 2, 2)
    const mesh = new THREE.Mesh(geo, material)
    mesh.position.set(-11, this.h -1, 19)
    group.add(mesh)
    sceneInstance.scene.add(group)
  }
}

export default Sense
