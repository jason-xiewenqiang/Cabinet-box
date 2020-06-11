import { loadTexture } from './utils'

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

export default Cabinet