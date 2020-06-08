import { loadTexture } from './utils'

window.onload = function () {
  const iScene = new IScene()
  const cabinet = new Cabinet(50, 50, 'Hello', iScene)
  // window.addEventListener('resize', iScene.onResize.bind(iScene), false)
}

class IScene {
  constructor(params) {
    this.scene = new THREE.Scene()
    this.scene.add(new THREE.AxesHelper(150))
    this.camera = this.initCamera()
    this.initLight()
    this.initRenderer()
    this.initTexture()
    this.initFloor()
    this.render()
    this.initControls()
    window.addEventListener('resize', this.onResize.bind(this), false)
  }

  initCamera() {
    const camera =new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 2000)
    camera.position.set(0, 100, 300)
    return camera
  }

  initLight() {
    this.dircLight = new THREE.DirectionalLight(0xffffff)
    this.dircLight.position.set(300, 400, 200)
    this.scene.add(this.dircLight)
    this.scene.add(new THREE.AmbientLight(0x444444))
  }

  initRenderer(container = null) {
    this.renderer = new THREE.WebGLRenderer({
        antialias: true 
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor('#39609B')
    container ? container.appendChild(this.renderer.domElement) : document.body.appendChild(this.renderer.domElement)
  }

  initTexture() {
    // const loader = new THREE.TextureLoader()
    this.floorTexture = loadTexture('images/floor.jpg', () => {this.render()})
    this.floorTexture.wrapS = THREE.RepeatWrapping
    this.floorTexture.wrapT = THREE.RepeatWrapping
    this.floorTexture.repeat.set(14, 10)
  }

  // loadTexture(src, render) {
  //   const loader = new THREE.TextureLoader()
  //   return loader.load(src, () => {render()})
  // }

  initFloor() {
    console.log(this.floorTexture)
    const geometry = new THREE.BoxGeometry(400, 2, 300)
    const material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: this.floorTexture
    })
    this.floor = new THREE.Mesh(geometry, material)
    this.floor.position.set(0, -1, 0)
    this.scene.add(this.floor)
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  initControls() {
    this.controls = new THREE.OrbitControls(this.camera)
    this.controls.addEventListener('change', this.render.bind(this))
    this.controls.maxDistance = 2000
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

class Cabinet {
  _bottomWidth = 30 // 宽
  _bottomLength = 40 // 长
  constructor(x, z, cabNumber, sceneInstance) {
    this.x = x
    this.z = z
    this.y = 0
    this.number = cabNumber
    this.buildBox(sceneInstance)
  }
  
  buildBox(sceneInstance) {
    // 机箱外表
    const t1 = loadTexture('images/rack_panel.jpg', () => { sceneInstance.render() })
    const t2 = loadTexture('images/cabz.jpg', () => { sceneInstance.render() })
    const t3 = loadTexture('images/cabz.jpg', () => { sceneInstance.render() })

    const cabGroup = new THREE.Group()
    cabGroup.position.set(this.x, this.y, this.z)
    cabGroup.name = 'CabinetGroup'

    const cabMatLambert = new THREE.MeshLambertMaterial({
      color:0x8E8E8E,
      map: t1
    })
    const cabMatBasic = new THREE.MeshBasicMaterial({
      color:0x8E8E8E,
      map: t1
    })

    // 机箱主体？
    const cabBottomGeo = new THREE.BoxGeometry(this._bottomWidth, 2, this._bottomLength)
    const cabBottom = new THREE.Mesh(cabBottomGeo, cabMatBasic)
    cabBottom.position.set(0, 1, 0)

    // 左侧
    const cabLeftGeo = new THREE.BoxGeometry(2, 88, this._bottomLength)
    const cabLeftMaterials = []
    cabLeftMaterials.push(
      cabMatLambert,
      cabMatLambert,
      cabMatLambert,
      cabMatLambert,
      new THREE.MeshBasicMaterial({
        color:  0xBEBEBE,
        map: t2
      }),
      cabMatBasic
    )
    const cabLeftMat = new THREE.MeshFaceMaterial(cabLeftMaterials)
    const cabLeft = new THREE.Mesh(cabLeftGeo, cabLeftMat)
    cabLeft.position.set(this._bottomWidth / 2 - 1, 46, 0)

    // 右侧
    const cabRightGeo = new THREE.BoxGeometry(2, 88, this._bottomLength)
    const cabRightMaterials = []
    cabRightMaterials.push(
      cabMatLambert,
      cabMatBasic,
      cabMatLambert,
      cabMatLambert,
      new THREE.MeshBasicMaterial({
        color:  0xBEBEBE,
        map: t3
      }),
      cabMatBasic
    )
    const cabRightMat = new THREE.MeshFaceMaterial(cabRightMaterials)
    const cabRight = new THREE.Mesh(cabRightGeo, cabRightMat)
    cabRight.position.set(- this._bottomWidth / 2 + 1, 46, 0)

    // 背面版
    const cabBackGeo = new THREE.BoxGeometry(this._bottomWidth -4, 88, 2); // 后板
    const cabBack = new THREE.Mesh(cabBackGeo, cabMatBasic);
    cabBack.position.set(0, 46, 0 - this._bottomLength / 2 + 1);
    
    // 顶板
    const cabTopGeo = new THREE.BoxGeometry(this._bottomWidth, 2, this._bottomLength)
    const cabTopMaterials = []
    cabTopMaterials.push(
      cabMatBasic,
      cabMatBasic,
      new THREE.MeshLambertMaterial({
        color:0x8E8E8E,
        map: this.canvasTexture(this.number)
      }),
      cabMatLambert,
      cabMatLambert,
      cabMatLambert,
    )
    const cabTopMat = new THREE.MeshFaceMaterial(cabTopMaterials)
    const cabTop = new THREE.Mesh(cabTopGeo, cabTopMat)
    cabTop.position.set(0, 91, 0)
    cabTop.name = 'cabTop'

    cabGroup.add(cabBottom, cabLeft, cabRight, cabBack, cabTop)

    // 机箱门
    const cabDoorGroup = new THREE.Group()
    cabDoorGroup.position.set(this.x + 15, this.y, this.z + 20)
    cabDoorGroup.name = this.number

    const doorGeo = new THREE.BoxGeometry(this._bottomWidth, 92, 1)
    const doorMaterials = []
    doorMaterials.push(
      new THREE.MeshLambertMaterial({ color: 0x999999 }),
      new THREE.MeshLambertMaterial({ color: 0x999999 }),
      new THREE.MeshLambertMaterial({ color: 0x999999 }),
      new THREE.MeshLambertMaterial({ color: 0x999999 }),
      new THREE.MeshLambertMaterial({ 
        map: loadTexture('images/rack_front_door.jpg', () => { sceneInstance.render() }),
        overdraw: true
      }),
      new THREE.MeshBasicMaterial({
        map: loadTexture('images/rack_front_door.jpg', () => { sceneInstance.render() }),
        overdraw:true
      })
    )
    const doorMat = new THREE.MeshFaceMaterial(doorMaterials)
    const door = new THREE.Mesh(doorGeo, doorMat)
    door.name = 'door'
    door.position.set(- this._bottomWidth / 2, 46, .5)
    cabDoorGroup.add(door)

    sceneInstance.scene.add(cabGroup, cabDoorGroup)
  }

  canvasTexture(number) {
    const canvas = document.createElement("canvas")
    canvas.width = 50
    canvas.height = 40
    const ctx = canvas.getContext("2d");
    const g = ctx.createLinearGradient(0, 0, 50, 40)
    g.addColorStop(0, "#777")
    g.addColorStop(1, "#777")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 50, 40)
    ctx.textBaseline = 'top'
    ctx.font = "20px SimHei"
    ctx.fillStyle = "#00ffff"
    const txtWidth = ctx.measureText(number).width
    ctx.fillText(number , 50 / 2 - txtWidth / 2, 40 / 2 - 20 / 2)
    const texture = new THREE.Texture(canvas)
    texture.needsUpdate = true
    return texture
  }
  
}
