import { loadTexture } from './utils'

class IScene {
  constructor(params) {
    this.parent = params.parent
    this.scene = new THREE.Scene()
    this.scene.position.set(0, -40, 5)
    this.camera = this.initCamera(params.parent)

    // 粒子效果相关参数
    this.particle = null
    this.particles = []
    this.AMOUNTX = 100
    this.AMOUNTY = 70
    this.SEPARATION = 80
    this.count = 0

    // 设置开发模式
    this.dev = params && params.dev
    this.initLight()
    this.initRenderer(params.parent)
    this.initTexture()
    this.initFloor()
    if (params && params.dev) {
      this.stats(params.parent)
    }
    this.initWave()
    this.render()
    this.initControls()
    this.animate()
    window.addEventListener('resize', this.onResize.bind(this, params.parent), false)
    window.addEventListener('dblclick', this.injectHandler.bind(this, params.parent), false)
  }

  // 渲染摄像头
  initCamera(container) {
    const width = container ? container.offsetWidth : window.innerWidth
    const height = container ? container.offsetHeight : window.innerHeight
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000)
    camera.position.set(0, 30, 200)
    return camera
  }

  // 渲染灯光
  initLight() {
    this.dircLight = new THREE.DirectionalLight(0xffffff)
    this.dircLight.position.set(300, 400, 200)
    this.scene.add(this.dircLight)
    var hemi = new THREE.HemisphereLight(0x003073, 0x029797, 0.75)
    hemi.position.set(0.5, 1, 0.75)
    this.scene.add(hemi)
  }

  // 渲染场景
  initRenderer(container) {
    const width = container ? container.offsetWidth : window.innerWidth
    const height = container ? container.offsetHeight : window.innerHeight
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    this.renderer.setSize(width, height)
    this.renderer.setClearColor('#00272f')
    container ? container.appendChild(this.renderer.domElement) : document.body.appendChild(this.renderer.domElement)
  }

  initTexture() {
    this.floorTexture = loadTexture('images/floor.png', () => { this.render() })
    this.floorTexture.wrapS = THREE.RepeatWrapping
    this.floorTexture.wrapT = THREE.RepeatWrapping
    this.floorTexture.repeat.set(1, 1)
  }

  // 地板
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

  // 鼠标控制器
  initControls() {
    this.controls = new THREE.OrbitControls(this.camera)
    this.controls.addEventListener('change', this.render.bind(this))
    this.controls.maxDistance = 2000
  }

  // resize事件处理
  onResize(container) {
    const width = container ? container.offsetWidth : window.innerWidth
    const height = container ? container.offsetHeight : window.innerHeight
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  // 注册器
  injectHandler(container, event) {
    const width = container ? container.offsetWidth : window.innerWidth
    const height = container ? container.offsetHeight : window.innerHeight
    event.preventDefault()
    let vector = new THREE.Vector3(
      (event.clientX / width) * 2 - 1,
      -(event.clientY / height) * 2 + 1,
      0.5
    )
    vector = vector.unproject(this.camera)
    const raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize())
    const intersects = raycaster.intersectObjects(this.scene.children, true)
    const firstObj = intersects[0].object

    if (firstObj.name == 'door') {

      if (firstObj.parent.rotation.y == 0) {
        new TWEEN.Tween(firstObj.parent.rotation).to({
          y: 0.6 * Math.PI
        }, 1500).easing(TWEEN.Easing.Elastic.Out).start()
      } else {
        new TWEEN.Tween(firstObj.parent.rotation).to({
          y: 0
        }, 300).start()
      }
      this.controls.update()
    }

    if(firstObj.name === 'server'){
       if(firstObj.parent.position.z === 0){
           new TWEEN.Tween( firstObj.parent.position ).to({
               z: firstObj.parent.position.z + 20
           }, 500 ).easing( TWEEN.Easing.Elastic.Out).start()
       }else{
           new TWEEN.Tween( firstObj.parent.position ).to({
               z: firstObj.parent.position.z - 20
           }, 500 ).easing( TWEEN.Easing.Elastic.Out).start()
       }
       this.controls.update()
   }
    this.render()
  }

  stats(container) {
    this.stats = new Stats()
    container ? container.appendChild(this.stats.dom) : document.body.appendChild(this.stats.dom)
  }

  animate() {
    this.render()
    this.dev && this.stats.update()
    requestAnimationFrame(this.animate.bind(this))
  }
}

export default IScene