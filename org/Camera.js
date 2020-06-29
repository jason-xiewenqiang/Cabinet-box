
class Camera {
  constructor(options) {
    this.options = options
    this.x = options.x
    this.y = options.y
    this.z = options.z
    this.group = this.render()
  }

  render () {
    const group = new THREE.Group()
    group.position.set(this.x, this.y, this.z)

    const geo = new THREE.CylinderGeometry(5, 5, 0.1, 10000)
    const material = new THREE.MeshLambertMaterial({
      color: 'rgba(0, 122, 255, 1)',
      transparent: true,
      opacity: 0.8
    })
    const mesh = new THREE.Mesh(geo, material)
    mesh.position.set(-10,108,20)
    mesh.rotateX(Math.PI / 2)
    group.add(mesh)
    return group
  }
}

export default Camera