import { loadTexture } from './utils'

window.onload = function () {
  const iScene = new IScene()
  const cabinet = new Cabinet(50, 50, '机柜1', iScene)
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
    this.animate()
    window.addEventListener('resize', this.onResize.bind(this), false)
    window.addEventListener('dblclick', this.injectHandler.bind(this), false)
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

  initFloor() {
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
    TWEEN.update()
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

  // 注册器
  injectHandler(event) {
    
    event.preventDefault()
    // 在屏幕上点击的位置创建一个向量
    let vector = new THREE.Vector3(
      (event.clientX / window.innerWidth ) * 2 - 1,
      -( event.clientY / window.innerHeight ) * 2 + 1,
      0.5
    )
    // 点击位置转换成Thres.js场景中的坐标
    vector = vector.unproject(this.camera)
    // 用THREE.Raycaster对象向点击位置发射光线
    const raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize())
    // 计算射线相机到的对象，可能有多个对象，因此返回的是一个数组，按离相机远近排列
    // 将射线投影到屏幕，如果scene.children里的某个或多个形状相交，则返回这些形状
    // 第二个参数是设置是否递归，默认是false，也就是不递归。当scene里面添加了Group对象的实例时，就需要设置这个参数为true
    // 第一个参数不传scene.children也可以，传一个group.children或一个形状数组都可以（这样可以实现一些特别的效果如点击内部的效果）
    // 另外，因为返回的是一个数组，所以遍历数组就可以获得所有相交的对象，当元素重叠时，特别有用
    const intersects = raycaster.intersectObjects(this.scene.children, true)
    // firstObj为点击到的第一个对象
    const firstObj = intersects[0].object

    if (firstObj.name == 'door') {
      const p1 = new THREE.Vector3(firstObj.parent.position)
      const number = firstObj.parent.name

      if (firstObj.parent.rotation.y == 0) {
        new TWEEN.Tween(firstObj.parent.rotation).to({
          y: 0.6 * Math.PI
        }, 1500).easing(TWEEN.Easing.Elastic.Out).start()

        this.controls.target = new THREE.Vector3(
          firstObj.parent.position.x,
          firstObj.parent.position.y+50,
          firstObj.parent.position.z
        )
        this.camera.position.set(
          firstObj.parent.position.x+15,
          firstObj.parent.position.y+100,
          firstObj.parent.position.z+130
        )
      } else {
        new TWEEN.Tween( firstObj.parent.rotation ).to({
          y: 0
        }, 300 ).start()
      }
      this.controls.update()
    }
    this.render()
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))
    this.render()
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
    const t3 = loadTexture('images/caby.jpg', () => { sceneInstance.render() })

    const cabGroup = new THREE.Group()
    cabGroup.position.set(this.x, this.y, this.z)
    cabGroup.name = 'CabinetGroup'

    const cabMatLambert = new THREE.MeshLambertMaterial({
      color: 0x8E8E8E,
      map: t1
    })
    const cabMatBasic = new THREE.MeshBasicMaterial({
      color: 0x8E8E8E,
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
    const cabBackGeo = new THREE.BoxGeometry(this._bottomWidth - 4, 88, 2); // 后板
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
        map: loadTexture('images/rack_front_door.jpg', () => { sceneInstance.render() })
      }),
      new THREE.MeshBasicMaterial({
        map: loadTexture('images/rack_door_back.jpg', () => { sceneInstance.render() })
      })
    )
    const doorMat = new THREE.MeshFaceMaterial(doorMaterials)
    const door = new THREE.Mesh(doorGeo, doorMat)
    door.name = 'door'
    door.position.set(- this._bottomWidth / 2, 46, 0.5)
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



