class Sprite {
  constructor(params) {
    this.parent = params.parent
    this.scene = new THREE.Scene()
    this.scene.position.set(0, -40, 10)
    this.camera = this.initCamera(params.parent)
    this.canControl = false
    

    // 粒子效果相关参数
    this.particle = null
    this.particles = []
    this.AMOUNTX = 100
    this.AMOUNTY = 80
    this.SEPARATION = 60
    this.count = 0

    // 设置开发模式
    this.dev = params && params.dev
    this.initLight()
    this.initRenderer(params.parent)

    this.initWave()
    this.render()
    this.animationID =  this.animate()
    window.addEventListener('resize', this.onResize.bind(this, params.parent), false)
  }

  destroyed() {
    window.cancelAnimationFrame(this.animationID)
    this.scene = null
    this.camera = null
    this.particle = null
    this.particles = []
    this.dircLight = null
    this.dev = null
    window.removeEventListener('resize', ()=>{})
    if (this.parent) {
      this.parent.removeChild(this.renderer.domElement)
    }
    this.renderer = null
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
    let hemi = new THREE.HemisphereLight(0x003073, 0x029797, 0.75)
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
    this.renderer.setClearColor('#003879')
    container ? container.appendChild(this.renderer.domElement) : document.body.appendChild(this.renderer.domElement)
  }

  //  added by tim
  initWave() {
    let PI2 = Math.PI * 2
    let mt = new THREE.PointCloudMaterial({
      color: '#02d7e8',
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

  render() {
    TWEEN.update()
    if (this.particle) {
      let i = 0
      for (let ix = 0; ix < this.AMOUNTX; ix++) {
        for (let iy = 0; iy < this.AMOUNTY; iy++) {
          this.particle = this.particles[i++]
          this.particle.position.y = (Math.sin((ix + this.count) * 0.3) * 50) + (Math.sin((iy + this.count) * 0.5) * 50) - 100
          this.particle.scale.x = this.particle.scale.y = (Math.sin((ix + this.count) * 0.3) + 1) * 2 + (Math.sin((iy + this.count) * 0.5 + 1) * 2)
          
        }
      }
      this.count += 0.1
      this.renderer.render(this.scene, this.camera)
    }
  }

  // resize事件处理
  onResize(container) {
    const width = container ? container.offsetWidth : window.innerWidth
    const height = container ? container.offsetHeight : window.innerHeight
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  animate() {
    this.render()
    return window.requestAnimationFrame(this.animate.bind(this))
  }
}

export default Sprite