class Camera {
  constructor(x,y,z,sceneInstance) {
    this.x = x
    this.y = y
    this.z = z
    this.build(sceneInstance.scene)
  }
  build (scene) {
    const loader = new THREE.OBJLoader();
    loader.load('../js/camera.obj', (obj) => {
      // console.log(obj);
      // console.log(obj.children[0].material);
      console.log(obj.children)
      obj.position.set(0, 40, 40)
      scene.add(obj);
      // obj.children[0].scale.set(20,20,20); 
      obj.children[0].geometry.center(); 
      obj.children[0].material.color.set(0xff0000); 
    })
  }
}

export default Camera