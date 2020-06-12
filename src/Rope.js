import { loadTexture } from './utils'
class Rope {
  constructor(options) {
    this.x = options.cabinet.x
    this.y = options.y || 0
    this.z = options.cabinet.z
    this.radius = options.radius
    this.build(options.scene)
  }

  build(sceneInstance) {
    const group = new THREE.Group()
    group.position.set(this.x, this.y, this.z)

    // const texture = loadTexture('images/rope.jpg', () => { sceneInstance.render() })
    const material = new THREE.MeshBasicMaterial({
      color: 'pink'
    })

    const p1 = new THREE.Vector3(-12, 0, 18.5)
    const p2 = new THREE.Vector3(-12, 0, -17)
    const p4 = new THREE.Vector3(12, 0, -17)
    const p5 = new THREE.Vector3(12, 0, 18.5)

    const line1 = new THREE.LineCurve3(p1,p2)
    const curve = new THREE.CatmullRomCurve3([p2, p4])
    const line2 = new THREE.LineCurve3(p4,p5)

    const CurvePath = new THREE.CurvePath()
    CurvePath.curves.push(line1, curve, line2)
    const geometry = new THREE.TubeGeometry(CurvePath, 200, 0.5, 25, true)
    const mesh = new THREE.Mesh(geometry, material)
    group.add(mesh)
    this.group = group
    sceneInstance.scene.add(group)
  }

}

export default Rope
