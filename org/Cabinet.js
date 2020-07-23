import { colors, colorRGB } from './Config'
// import Info from './Info'
import Camera from './Camera'
// import Label from './Label'
// import WSD from './WSD'
import Name from './Name'

class Cabinet {
  constructor(options) {
    this.options = options
    this.x = options.x
    this.z = options.z
    this.y = options.y
    this.width = options.width // 宽
    this.length = options.length // 长
    this.height = options.height // 高
    this.name = options.name
    this.resource_id = options.resource_id
    this.build()
  }

  build() {
    this.group = new THREE.Group()
    this.group.resource_id = this.resource_id
    this.group.position.set(this.x, this.y, this.z)
    this.group.name = this.name
    
    const bottom = this.bottomBoard()
    this.group.add(bottom)
    const right = this.rightSide()
    this.group.add(right)
    const left = this.leftSide()
    this.group.add(left)
    const top = this.topBoard()
    this.group.add(top)
    const fDoor = this.frontDoor()
    this.group.add(fDoor)
    const bDoor = this.backDoor()
    this.group.add(bDoor)
    
    const smoke = this.smoke()
    this.group.add(smoke)

    const cName = new Name(this.options)
      this.group.add(cName.group)
    
    // 只有第一个机柜加入摄像头和漏水绳子
    if (this.options.first) {
      const rope = this.rope()
      this.group.add(rope)
      const camera = new Camera(this.options)
      this.group.add(camera.group)
    } 
    
    if (this.options[this.options.resource_id].length) {
      this.options[this.options.resource_id].forEach((ser, index) => {
        this.addAsset(ser)
      })
    }
  }

  removeAsset(ids) {
    if (ids && Array.isArray(ids)) {
      ids.forEach(id => {
        this.group.children.forEach(child => {
          if (child.hasOwnProperty('resource_id') && child.resource_id === id) {
            this.group.remove(child);
          }
        })
      })
    }
  }

  addAsset(ser) {
    let h = Number(ser.u_height) + Number(ser.start_u)
    let thickness = Number(ser.u_height)
    let server = this.server(h, thickness, ser.resource_id)
    this.group.add(server)
  }

  topBoard() {
    const group = new THREE.Group()
    group.position.set(this.x, this.y, this.z)
    group.name = 'top-group'
    const lambertMaterial = new THREE.MeshLambertMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      opacity: 1,
      map: this.gradientTexure(colorRGB.normal)
    })
    const geo = new THREE.BoxGeometry(this.width + 4, 2, this.length - 1)
    const materials = []
    materials.push(
      lambertMaterial,
      lambertMaterial,
      new THREE.MeshLambertMaterial({
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
        map: this.gradientTexure(colorRGB.warning)
      }),
      lambertMaterial,
      lambertMaterial,
      lambertMaterial,
    )
    const mesh = new THREE.MeshFaceMaterial(materials)
    const topBoard = new THREE.Mesh(geo, mesh)
    topBoard.position.set(0, 99, 0)
    topBoard.name = 'topBoard'
    group.add(topBoard)
    return group
  }

  frontDoor() {
    const group = new THREE.Group()
    group.position.set(this.x + 15, this.y, this.z + 20)
    group.name = 'frontDoor-group'

    const lambertMaterial = new THREE.MeshLambertMaterial({
      color: colors.normal,
      transparent: true,
      side: THREE.DoubleSide,
      opacity: 0.3,
      map: this.gradientTexure(colorRGB.normal)
    })

    const geo = new THREE.BoxGeometry(this.width + 4, this.height, 2)
    const materials = []
    materials.push(
      lambertMaterial,
      lambertMaterial,
      lambertMaterial,
      lambertMaterial,
      new THREE.MeshLambertMaterial({
        map: this.gradientTexure(colorRGB.normal),
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide,
      }),
      new THREE.MeshLambertMaterial({
        map: this.gradientTexure(colorRGB.normal),
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      })
    )
    const mesh = new THREE.MeshFaceMaterial(materials)
    const door = new THREE.Mesh(geo, mesh)
    door.name = 'front-door'
    door.position.set(-this.width / 2, 50, 0)

    // const info = new Label({x: 0, y: 0, z: 0, text: 'aaaaaaaa'})
    // group.add(info.box)
    group.add(door)
    return group
  }

  backDoor() {
    const group = new THREE.Group()
    group.position.set(this.x - 15, this.y, this.z - 20)
    group.name = 'backDoor-group'

    const lambertMaterial = new THREE.MeshLambertMaterial({
      color: 0x007aff,
      transparent: true,
      side: THREE.DoubleSide,
      opacity: 1,
      map: this.gradientTexure(colorRGB.normal)
    })

    const geo = new THREE.BoxGeometry(this.width + 4, this.height, 2)
    const materials = []
    materials.push(
      lambertMaterial,
      lambertMaterial,
      lambertMaterial,
      lambertMaterial,
      new THREE.MeshLambertMaterial({
        map: this.gradientTexure(colorRGB.normal),
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide,
      }),
      lambertMaterial
    )
    const mesh = new THREE.MeshFaceMaterial(materials)
    const door = new THREE.Mesh(geo, mesh)
    door.name = 'back-door'
    door.position.set(this.width / 2, 50, 0)
    group.add(door)
    return group
  }

  rightSide() {
    const group = new THREE.Group()
    group.position.set(this.x, this.y, this.z)
    group.name = 'right-group'

    const lambertMaterial = new THREE.MeshLambertMaterial({
      color: colors.normal,
      transparent: true,
      side: THREE.DoubleSide,
      opacity: 1,
      map: this.gradientTexure(colorRGB.normal)
    })
    const geo = new THREE.BoxGeometry(2, this.height, this.length)
    const materials = []
    materials.push(
      lambertMaterial,
      lambertMaterial,
      lambertMaterial,
      lambertMaterial,
      new THREE.MeshBasicMaterial({
        color: colorRGB.normal,
        transparent: true,
        side: THREE.DoubleSide,
        opacity: 0.5
      }),
      lambertMaterial,
    )
    const mesh = new THREE.MeshFaceMaterial(materials)
    const rightSide = new THREE.Mesh(geo, mesh)
    rightSide.position.set(this.width / 2 + 1, 50, 0)
    group.add(rightSide)
    return group
  }
  
  leftSide() {
    const group = new THREE.Group()
    group.position.set(this.x, this.y, this.z)
    group.name = 'left-group'
    const lambertMaterial = new THREE.MeshLambertMaterial({
      color: colors.normal,
      transparent: true,
      side: THREE.DoubleSide,
      opacity: 1,
      map: this.gradientTexure(colorRGB.normal)
    })
    const geo = new THREE.BoxGeometry(2, this.height, this.length)
    const materials = []
    materials.push(
      lambertMaterial,
      lambertMaterial,
      lambertMaterial,
      lambertMaterial,
      new THREE.MeshBasicMaterial({
        color: 0x4ebaff,
        transparent: true,
        side: THREE.DoubleSide,
        opacity: 0.5
      }),
      lambertMaterial,
    )
    const mesh = new THREE.MeshFaceMaterial(materials)
    const leftSide = new THREE.Mesh(geo, mesh)
    leftSide.position.set(- this.width / 2 - 1, 50, 0)
    group.add(leftSide)
    return group
  }

  bottomBoard() {
    const group = new THREE.Group()
    group.position.set(this.x, this.y, this.z)
    group.name = 'bottom-group'
    const basicMaterial = new THREE.MeshBasicMaterial({
      color: 0x007aff,
      transparent: true,
      side: THREE.DoubleSide,
      opacity: 0.4
    })
    const geo = new THREE.BoxGeometry(this.width + 4, 2, this.length)
    const bottomBoard = new THREE.Mesh(geo, basicMaterial)
    bottomBoard.position.set(0, 1, 0)
    bottomBoard.name = 'bottomBoard'
    group.add(bottomBoard)
    return group
  }

  rope() {
    const group = new THREE.Group()
    group.position.set(this.x, this.y + 2.5, this.z)

    const material = new THREE.MeshBasicMaterial({
      color: 0x4ebaff
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
    const geometry = new THREE.TubeGeometry(CurvePath, 200, 0.2, 25, true)
    const mesh = new THREE.Mesh(geometry, material)
    group.add(mesh)
    return group
  }

  smoke() {
    const group = new THREE.Group()
    group.position.set(this.x, this.y, this.z)

    const material = new THREE.LineBasicMaterial({color: 0x007aff})
    const material1 = new THREE.LineBasicMaterial({color: 0x007aff})

    var geometry2 = new THREE.CylinderGeometry( 4, 4, 1, 25 );
    var geometry3 = new THREE.CylinderGeometry(3, 0, 1, 25);

    const mesh2 = new THREE.Mesh(geometry2, material)
    const mesh3 = new THREE.Mesh(geometry3, material1)

    mesh2.position.set(0, this.height - 2, 0)
    mesh3.position.set(0, this.height - 3, 0)

    group.add(mesh2)
    group.add(mesh3)
    return group
  }

  server(h, thickness, id) {
    const group = new THREE.Group()
    group.position.set(this.x, this.y, this.z)

    const geo = new THREE.BoxGeometry(30, thickness - 0.2, 40)
    const mat = new THREE.MeshBasicMaterial({
      color: 0x4ebaff,
      opacity: 0.7,
      transparent: true,
      side: THREE.DoubleSide,
    })
    const server = new THREE.Mesh(geo, mat)
    server.position.set(0, h - 0.1, 0)
    server.name = 'server'
    group.add(server)
    group.resource_id = id
    return group
  }

  switchs(h, thickness, id) {
    const switchGroup = new THREE.Group()
    switchGroup.position.set(this.x, this.y, this.z)

    const switchGeo = new THREE.BoxGeometry(30, thickness, 40)
    const switchMat = new THREE.MeshBasicMaterial({
      color: 0x4ebaff,
      opacity: 0.4,
      transparent: true,
      side: THREE.DoubleSide,
    })
    const switchBody = new THREE.Mesh(switchGeo, switchMat)
    switchBody.name = 'switch'
    switchGroup.resource_id = id

    switchBody.position.set(0, h, 0)
    switchGroup.add(switchBody)
    return switchGroup
  }

  renderServerAndSwitch(server, sws) { }

  gradientTexure() {
    const canvas = document.createElement("canvas")
    canvas.width = 256
    canvas.height = 1024
    const ctx = canvas.getContext("2d");
    const g = ctx.createLinearGradient(0, 1024, 1024, 0 )
    g.addColorStop(0, "rgba(0,0,0, 0)")
    g.addColorStop(0.68, 'rgba(0,122,255,1)')
    g.addColorStop(0.7, "rgba(0,0,0, 0)")
    g.addColorStop(1, 'rgba(0,122,255,1)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 256, 1024)
    const texture = new THREE.Texture(canvas)
    texture.needsUpdate = true
    return texture
  }
}

export default Cabinet
