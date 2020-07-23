/*
 * @Author: jason-xiewenqiang
 * @Email: xiewenqiang@xbrother.com
 * @Date: 2020-06-29 17:19:28
 * @LastEditors: jason-xiewenqiang
 * @LastEditTime: 2020-07-20 18:38:57
 * @Description: 名称面板显示
 */
class Name {
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
    mesh.position.set(0, 2, 30)
    mesh.rotateX(Math.PI / 2)
    group.add(mesh)
    return group
  }

  createLabel () {
    const label = document.createElement('div')
    const html = `
      <h3 class="name">${this.options.name}</h3>
    `
    const text = document.createElement('div')
    text.className = 'text-name'
    text.innerHTML = html
    label.className = 'text-outer-name'
    label.appendChild(text)
    return new THREE.CSS2DObject(label)
  }
}

export default Name