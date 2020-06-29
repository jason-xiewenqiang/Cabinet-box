class Info {
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

    const geo = new THREE.BoxGeometry(30, 15, 0.2)
    const mats = []
    const material = new THREE.MeshLambertMaterial({
      color: 'rgba(0, 122, 255, 1)',
      transparent: true,
      opacity: 0.8
    })
    mats.push(
      material,
      material,
      material,
      material,
      material,
      material
    )
    const mesh = new THREE.Mesh(geo, mats)
    mesh.position.set(0,10,45)
    mesh.rotateX(75)
    group.add(mesh)
    return group
  }

   // canvasTexture(number) {
  //   const canvas = document.createElement("canvas")
  //   canvas.width = 50
  //   canvas.height = 40
  //   const ctx = canvas.getContext("2d");
  //   const g = ctx.createLinearGradient(0, 0, 50, 40)
  //   g.addColorStop(0, "#777")
  //   g.addColorStop(1, "#777")
  //   ctx.fillStyle = g
  //   ctx.fillRect(0, 0, 50, 40)
  //   ctx.textBaseline = 'top'
  //   ctx.font = "20px SimHei"
  //   ctx.fillStyle = "#00ffff"
  //   const txtWidth = ctx.measureText(number).width
  //   ctx.fillText(number, 50 / 2 - txtWidth / 2, 40 / 2 - 20 / 2)
  //   const texture = new THREE.Texture(canvas)
  //   texture.needsUpdate = true
  //   return texture
  // }
}

export default Info