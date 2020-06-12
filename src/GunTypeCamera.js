
class GunTypeCamera {
  constructor(options) {
    this.build(options.scene)
  }
  build(sceneInstance) {
    var points = []
    for ( var i = 0; i < 10; i ++ ) {
      points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) )
    }
    var geometry = new THREE.LatheBufferGeometry( points )
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } )
    var lathe = new THREE.Mesh( geometry, material )
    lathe.position.set(20,20,20)
    sceneInstance.scene.add( lathe )
}

}

export default GunTypeCamera
