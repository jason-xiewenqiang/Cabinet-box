import { loadTexture } from '../src/utils'
class Scene {
  constructor(selector = null, dev = true, cabNumber = 5, callback = null) {
    this.container = selector ? document.querySelector(selector) : null // 是否有容器
    this.width = this.container ? this.container.offsetWidth : window.innerWidth
    this.height = this.container ? this.container.offsetHeight : window.innerHeight
    this.dev = dev // 是否开发模式
    this.scene = new THREE.Scene()
    this.scene.position.set(0, -50, 0)
    this.camera = this.initCamera(cabNumber)
    this.rotateY = new THREE.Matrix4().makeRotationY( 0.005 );
    this.initLight()
    this.initRenderer()
    this.initTexture()
    this.initFloor(cabNumber)
    this.rotate = true  // 设置旋转

    // 粒子效果相关参数
    // this.particle = null
    // this.particles = []
    // this.AMOUNTX = 100
    // this.AMOUNTY = 60
    // this.SEPARATION = 80
    // this.count = 0
    // this.initWave()

    // dev = true 开启
    if (dev) {
      this.stats()
      this.AxesHelper = new THREE.AxesHelper(300)
      this.AxesHelper.position.set(0, 0, 0)
      this.scene.add(this.AxesHelper)
    }
    this.render()
    this.initControls()
    this.animationID = this.animate()
    window.addEventListener('resize', this.onResize.bind(this), false)
    window.addEventListener('dblclick', this.injectHandler.bind(this, callback), false)
  }

  setRotate(rat) {
    this.rotate = rat
  }

  // 摄像头
  initCamera(cabNumber) {
    const camera = new THREE.PerspectiveCamera(50, this.width / this.height, 1, 10000)
    // camera.position.set(0, cabNumber > 5 ? 5 : 15, 200)
    camera.position.set(0, 15, 200)
    camera.lookAt( this.scene.position );
    camera.updateMatrix();
    return camera
  }

  // 灯光
  initLight() {
    this.dircLight = new THREE.DirectionalLight(0xffffff)
    this.dircLight.position.set(300, 400, 200)
    this.scene.add(this.dircLight)
    const hemi = new THREE.HemisphereLight(0x003073, 0x029797, 0.75)
    hemi.position.set(0.5, 1, 0.75)
    this.scene.add(hemi)
  }

  // 地板
  initFloor(cabNumber) {
    // const geometry = new THREE.BoxGeometry(cabNumber > 5 ? 600 : 300, 0, cabNumber > 5 ? 250 : 200)
    const geometry = new THREE.BoxGeometry(300, 0, 250)
    const material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      map: this.floorTexture,
      transparent: true,
    })
    this.floor = new THREE.Mesh(geometry, material)
    this.floor.position.set(0, -1, 10)
    this.scene.add(this.floor)
  }

  // 材质
  initTexture() {
    this.floorTexture = loadTexture('images/floor.png', () => { this.render() })
    this.floorTexture.wrapS = THREE.RepeatWrapping
    this.floorTexture.wrapT = THREE.RepeatWrapping
    this.floorTexture.repeat.set(1, 1)
  }

  // 渲染器
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    this.renderer.setSize(this.width, this.height)
    // this.renderer.setClearColor('#0b0c0f')
    this.renderer.setClearColor(0xEEEEEE, 0.0)
    this.container ? this.container.appendChild(this.renderer.domElement) : document.body.appendChild(this.renderer.domElement)
    // 下面是 css的渲染
    this.labelRenderer = new THREE.CSS2DRenderer(); //新建CSS2DRenderer 
    this.labelRenderer.setSize(this.width, this.height);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = 0;
    this.container ? this.container.appendChild(this.labelRenderer.domElement) : document.body.appendChild(this.labelRenderer.domElement)
  }

  // 粒子效果
  initWave() {
    const PI2 = Math.PI * 2
    const mt = new THREE.PointCloudMaterial({
      color: '#0063f5',
      program: function (context) {
        context.beginPath()
        context.arc(0, 0, 16, 0, PI2)
        context.fill()
      }
    })
    let i = 0

    for (let ix = 0; ix < this.AMOUNTX; ix++) {
      for (let iy = 0; iy < this.AMOUNTY; iy++) {
        this.particle = this.particles[i++] = new THREE.Sprite(mt)
        this.particle.position.x = ix * this.SEPARATION - (this.AMOUNTX * this.SEPARATION / 2)
        this.particle.position.z = iy * this.SEPARATION - (this.AMOUNTY * this.SEPARATION / 2)
        this.scene.add(this.particle)
      }
    }
  }

  // 渲染
  render() {
    TWEEN.update()
    if (this.rotate) {
      this.camera.applyMatrix4( this.rotateY );
    }
    this.renderer.render(this.scene, this.camera)
    this.labelRenderer.render(this.scene, this.camera);
    // if (this.particle) {
      // let i = 0
      // for (let ix = 0; ix < this.AMOUNTX; ix++) {
      //   for (let iy = 0; iy < this.AMOUNTY; iy++) {
      //     this.particle = this.particles[i++]
      //     this.particle.position.y = (Math.sin((ix + this.count) * 0.3) * 50) + (Math.sin((iy + this.count) * 0.5) * 50) - 400
      //     this.particle.scale.x = this.particle.scale.y = (Math.sin((ix + this.count) * 0.3) + 1) * 2 + (Math.sin((iy + this.count) * 0.5 + 1) * 2)
      //   }
      // }
      // this.renderer.render(this.scene, this.camera)
      // this.labelRenderer.render(this.scene, this.camera);
      // this.count += 0.05
    // }
  }

  // 控制器
  initControls() {
    this.controls = new THREE.OrbitControls(this.camera)
    this.controls.addEventListener('change', this.render.bind(this))
    this.controls.maxDistance = 2000
    // this.controls.enabled = true;
    this.controls.maxPolarAngle = 1.5
    this.controls.minPolarAngle = 0.5
    this.controls.enableZoom = false
  }

  // resize
  onResize() {
    const width = this.container ? this.container.offsetWidth : window.innerWidth
    const height = this.container ? this.container.offsetHeight : window.innerHeight
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
    this.labelRenderer.render(this.scene, this.camera);
    this.labelRenderer.setSize(width, height)
  }

  // 性能监控器
  stats() {
    this.stats = new Stats()
    if (this.container) {
      this.container.appendChild(this.stats.dom)
    } else {
      document.body.appendChild(this.stats.dom)
    }
  }

  // 动画
  animate() {
    this.render()
    if (this.dev) { this.stats.update() }
    return requestAnimationFrame(this.animate.bind(this))
  }

  // 注册器
  injectHandler(callback, event) {
    const width = window.innerWidth
    const height = window.innerHeight
    event.preventDefault()
    let vector = new THREE.Vector3( (event.clientX / width) * 2 - 1, -(event.clientY / height) * 2 + 1, 0.5 )
    vector = vector.unproject(this.camera)
    const raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize())
    const intersects = raycaster.intersectObjects(this.scene.children, true)
    const firstObj = intersects[0].object

    if (callback && callback instanceof Function) {
      callback(firstObj.parent)
    }

    if (firstObj.name === 'front-door') {
      if (firstObj.parent.rotation.y == 0) {
        new TWEEN.Tween(firstObj.parent.rotation).to({ y: 0.6 * Math.PI }, 1500).easing(TWEEN.Easing.Elastic.Out).start()
      } else {
        new TWEEN.Tween(firstObj.parent.rotation).to({ y: 0 }, 300).start()
      }
      this.controls.update()
    }
    if (firstObj.name === 'back-door') {
      if (firstObj.parent.rotation.y == 0) {
        new TWEEN.Tween(firstObj.parent.rotation).to({ y: 0.6 * Math.PI }, 1500).easing(TWEEN.Easing.Elastic.Out).start()
      } else {
        new TWEEN.Tween(firstObj.parent.rotation).to({ y: 0 }, 300).start()
      }
      this.controls.update()
    }

    if(firstObj.name === 'server' || firstObj.name === 'switch') {
       if(firstObj.parent.position.z === 0){
           new TWEEN.Tween( firstObj.parent.position ).to({ z: firstObj.parent.position.z + 30 }, 500 ).easing( TWEEN.Easing.Elastic.Out).start()
       }else{
           new TWEEN.Tween( firstObj.parent.position ).to({ z: firstObj.parent.position.z - 30 }, 500 ).easing( TWEEN.Easing.Elastic.Out).start()
       }
       this.controls.update()
   }

    this.render()
  }

  destroyed() {
    window.cancelAnimationFrame(this.animationID)
    this.animationID = null
    this.scene = null
    this.camera = null
    this.particle = null
    this.particles = []
    this.dircLight = null
    this.dev = null
    this.controls = null
    window.removeEventListener('resize', ()=>{})
    window.removeEventListener('dblclick', ()=>{})
    if (this.container) {
      this.container.removeChild(this.renderer.domElement)
      this.container.removeChild(this.labelRenderer.domElement)
    } else {
      document.body.removeChild(this.renderer.domElement)
      document.body.removeChild(this.labelRenderer.domElement)
    }
    this.container = null
    this.renderer = null
    this.labelRenderer = null
  }
}

export default Scene
