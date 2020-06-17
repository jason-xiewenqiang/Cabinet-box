import { loadTexture } from './utils'

class IScene {
  constructor(params) {
    this.scene = new THREE.Scene()
    this.scene.position.set(0, -40, 5)
    this.camera = this.initCamera()

    this.particle = null
    this.particles = []
    this.AMOUNTX = 100
    this.AMOUNTY = 70
    this.SEPARATION = 80
    this.count = 0

    // 设置开发模式
    this.dev = params && params.dev
    this.initLight()
    this.initRenderer()
    this.initTexture()
    if (params && params.dev) {
      // this.scene.add(new THREE.AxesHelper(300))
      this.initFloor()
      this.stats()
    }
    this.initWave()
    this.render()
    this.initControls()
    this.animate()
    window.addEventListener('resize', this.onResize.bind(this), false)
    window.addEventListener('dblclick', this.injectHandler.bind(this), false)
  }

  initCamera() {
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
    camera.position.set(0, 0, 200)
    return camera
  }

  initLight() {
    this.dircLight = new THREE.DirectionalLight(0xffffff)
    this.dircLight.position.set(300, 400, 200)
    this.scene.add(this.dircLight)
    // this.scene.add(new THREE.AmbientLight(0x444444))
    var hemi = new THREE.HemisphereLight(0x003073, 0x029797, 0.75)
    hemi.position.set(0.5, 1, 0.75)
    this.scene.add(hemi)
  }

  initRenderer(container = null) {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor('#00272f')
    container ? container.appendChild(this.renderer.domElement) : document.body.appendChild(this.renderer.domElement)
  }

  initTexture() {
    this.floorTexture = loadTexture('images/floor.png', () => { this.render() })
    this.floorTexture.wrapS = THREE.RepeatWrapping
    this.floorTexture.wrapT = THREE.RepeatWrapping
    this.floorTexture.repeat.set(1, 1)
  }

  initFloor() {
    const geometry = new THREE.BoxGeometry(300, 0, 200)
    const material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      map: this.floorTexture,
      transparent: true,
    })
    this.floor = new THREE.Mesh(geometry, material)
    this.floor.position.set(0, -1, 0)
    this.scene.add(this.floor)
  }


  //  added by tim
  initWave() {
    var PI2 = Math.PI * 2
    var mt = new THREE.PointCloudMaterial({
      color: 0xe0e0e0,
      program: function (context) {
        context.beginPath()
        context.arc(0, 0, 16, 0, PI2)
        context.fill()
      }
      // map: getCircle()
    })
    var i = 0

    for (let ix = 0; ix < this.AMOUNTX; ix++) {
      for (let iy = 0; iy < this.AMOUNTY; iy++) {
        this.particle = this.particles[i++] = new THREE.Sprite(mt)
        this.particle.position.x = ix * this.SEPARATION - (this.AMOUNTX * this.SEPARATION / 2)
        this.particle.position.z = iy * this.SEPARATION - (this.AMOUNTY * this.SEPARATION / 2)
        this.scene.add(this.particle)
      }
    }

    // function getCircle() {
    //   const canvas = document.createElement("canvas")
    //   canvas.width = 16
    //   canvas.height = 16
    //   const ctx = canvas.getContext("2d");
    //   ctx.beginPath()
    //   ctx.fillStyle = 0xe0e0e0
    //   ctx.arc(0, 0, 16, 0, PI2)
    //   ctx.fill()
    //   const texture = new THREE.Texture(canvas)
    //   return texture
    // }
  }

  render() {
    TWEEN.update()
    var i = 0
    for (let ix = 0; ix < this.AMOUNTX; ix++) {
      for (let iy = 0; iy < this.AMOUNTY; iy++) {
        this.particle = this.particles[i++]
        this.particle.position.y = (Math.sin((ix + this.count) * 0.3) * 50) + (Math.sin((iy + this.count) * 0.5) * 50) - 100
        this.particle.scale.x = this.particle.scale.y = (Math.sin((ix + this.count) * 0.3) + 1) * 2 + (Math.sin((iy + this.count) * 0.5 + 1) * 2)
      }
    }
    this.renderer.render(this.scene, this.camera)
    this.count += 0.2
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
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
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

        // this.controls.target = new THREE.Vector3(
        //   firstObj.parent.position.x,
        //   firstObj.parent.position.y+50,
        //   firstObj.parent.position.z
        // )
        // this.camera.position.set(
        //   firstObj.parent.position.x+15,
        //   firstObj.parent.position.y+100,
        //   firstObj.parent.position.z+130
        // )
      } else {
        new TWEEN.Tween(firstObj.parent.rotation).to({
          y: 0
        }, 300).start()
      }
      this.controls.update()
    }
    this.render()
  }

  stats() {
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
  }

  animate() {
    this.render()
    this.dev && this.stats.update()
    requestAnimationFrame(this.animate.bind(this))
  }
}

export default IScene