class Smoke {
  constructor(options) {
    this.x = options.cabinet.x
    this.z = options.cabinet.z
    this.y = 0
    this.h = options.height
    this.build(options.scene)
  }

  build(sceneInstance) {
    const group = new THREE.Group()
    group.position.set(this.x, this.y, this.z)

    const material = new THREE.LineBasicMaterial({color: 0x007aff})
    const material1 = new THREE.LineBasicMaterial({color: 0x007aff})

    var geometry2 = new THREE.CylinderGeometry( 4, 4, 1, 25 );
    var geometry3 = new THREE.CylinderGeometry(3, 0, 1, 25);

    const mesh2 = new THREE.Mesh(geometry2, material)
    const mesh3 = new THREE.Mesh(geometry3, material1)

    mesh2.position.set(0, this.h, 0)
    mesh3.position.set(0, this.h - 1, 0)

    group.add(mesh2)
    group.add(mesh3)
    this.group = group
    sceneInstance.scene.add(group)
  }
}

export default Smoke
