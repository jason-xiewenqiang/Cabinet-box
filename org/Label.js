class Label {
  constructor(options) {
    this.x = options.x
    this.y = options.y
    this.z = options.z
    this.text = options.text
    this.box = this.build()
  }

  build () {
    const labelCanvas = document.createElement('canvas')
    labelCanvas.width = 64
    labelCanvas.height = 64
    labelCanvas.id = 'label-canvas'
    const labelCtx = labelCanvas.getContext('2d')
    // document.body.appendChild(this.updateLabelCanvas(labelCanvas, labelCtx, 0))

    // box
    const labelMaterial = this.getLabelMaterial(labelCanvas, labelCtx, 0)
    const box = new THREE.Mesh(new THREE.BoxGeometry(15, 15, 0.0001), labelMaterial)
    // const cssLabel = this.createLabel('sss金凤凰撒的发生的纠纷雷克萨绝地反击ss')
    // box.add(cssLabel)
    box.position.set(this.x - 7.5, this.y + 10, this.z + 0.0001)
    
    return box
  }
  
  createLabel (text) {
    const label = document.createElement('div')
    const imgDOM = document.createElement('div')
    const spanDOM = document.createElement('span')
    imgDOM.className = 'text-img'
    label.className = 'text-label'
    spanDOM.innerText = text
    label.appendChild(imgDOM)
    label.appendChild(spanDOM)
    return new THREE.CSS2DObject(label)
  }
  
  getLabelMaterial(labelCanvas, labelCtx) {
    var texture = new THREE.Texture(this.updateLabelCanvas(labelCanvas, labelCtx, 0))
    texture.needsUpdate = true
    return new THREE.MeshBasicMaterial({
        map: texture, //像素形状
        transparent: true,
    })
  }

  updateLabelCanvas(labelCan, labelCtx, testNum) {
    labelCtx.fillStyle = 0x007aff
    var rect = new Rect({
        x: 0, y: 0, h: labelCan.height, w: labelCan.width
    })
    var radius = [16, 0, 0, 16]
    var stroke = {
        style: "#007aff",
        width: 2
    }

    var fill = {
        style: "#007aff33",
    }
    this.drawRoundedRect(rect, radius, stroke, fill, labelCtx);

    var txt = {
        con: "测试",
        font: "14px Microsoft YaHei",
        fill: {
            x: 8,
            y: 8,
            align: "left",
            baseline: "top",
            style: "#ffffff",
        }
    }
    this.drawText(txt, labelCtx)

    var numTxt = {
        con: testNum.toFixed(1),
        font: "14px Microsoft YaHei",
        fill: {
            x: 40,
            y: 8,
            align: "left",
            baseline: "top",
            style: "#ffffff",
        }
    }
    this.drawText(numTxt, labelCtx)
    return labelCan
  }

  drawRoundedRect(rect, radius, stroke, fill, ctx) {

    var ptA = Point(rect.x + radius[0], rect.y);
    var ptB = Point(rect.x + rect.w, rect.y);
    var ptC = Point(rect.x + rect.w, rect.y + rect.h);
    var ptD = Point(rect.x, rect.y + rect.h);
    var ptE = Point(rect.x, rect.y);

    ctx.beginPath();

    ctx.moveTo(ptA.x, ptA.y);
    ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, radius[1]);
    ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, radius[2]);
    ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, radius[3]);
    ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, radius[0]);

    if (stroke) {
        ctx.strokeStyle = stroke.style
        ctx.linewidth = stroke.width
        ctx.stroke();
    }

    if (fill) {
        ctx.fillStyle = fill.style
        ctx.fill();
    }

    function Point(x, y) {
        return { x: x, y: y };
    };
  }

  drawText(text, ctx) {
    ctx.font = text.font
    ctx.beginPath();
    ctx.textAlign = text.fill.align;
    ctx.textBaseline = text.fill.baseline;
    ctx.fillStyle = text.fill.style;
    ctx.fillText(text.con, text.fill.x, text.fill.y);
  }

}

class Rect {
  constructor(option) {
    this.x = option.x || 0; //x ,y 坐标
    this.y = option.y || 0;
    this.h = option.h || 0; // 矩形的宽高
    this.w = option.w || 0;
    this.rotation = option.rotation || 0;  // 矩形的旋转
    // 设置矩形的透明度
    this.opacity = option.opacity === 0 ? 0 : option.opacity || 1;
    this.scaleX = option.scaleX || 1; // 设置矩形的 放到缩小
    this.scaleY = option.scaleY || 1;
    this.strokeStyle = option.strokeStyle || 'red'; // 划线颜色
    this.fillStyle = option.fillStyle || 'blue'; // 填充颜色
  }
}

export default Label