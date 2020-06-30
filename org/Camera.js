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

    const geo = new THREE.CylinderGeometry(0.01, 0.01, 0.01, 10000)
    const material = new THREE.MeshLambertMaterial({
      color: 'rgba(0, 122, 255, 1)',
      transparent: true,
      opacity: 0.8
    })
    const mesh = new THREE.Mesh(geo, material)

    const cssLabel = this.createLabel()
    mesh.add(cssLabel)
    mesh.position.set(-10,100,20)
    mesh.rotateX(Math.PI / 2)
    group.add(mesh)
    return group
  }

  createLabel () {
    const label = document.createElement('div')
    const imgDOM = document.createElement('div')
    imgDOM.className = 'text-img'
    label.className = 'text-label'
    // label.innerText = 'text-label'
    label.appendChild(imgDOM)
    return new THREE.CSS2DObject(label)
  }
}

export default Camera