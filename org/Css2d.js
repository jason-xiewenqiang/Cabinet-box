class Css2D {
  constructor(className, text) {
    this.className = className
    this.text = text
    this.instance = this.build()
  }
  build () {
    const label = document.createElement('div')
    label.className = this.className
    label.innerHTML = this.text
    return new THREE.CSS2DObject(label)
  }
}

export default Css2D
