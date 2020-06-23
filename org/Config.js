export const SceneData = {
  position: {
    x: 0,
    y: -40,
    z: 0
  }
}

export const CameraData = {
  type: 'PerspectiveCamera',
  // fov — 摄像机视锥体垂直视野角度
  // aspect — 摄像机视锥体长宽比
  // near — 摄像机视锥体近端面
  // far — 摄像机视锥体远端面
  fov: 45,
  aspect: (window) => (window.width / window.innerHeight),
  near: 1,
  far: 10000,
  position: {
    x: 0,
    y: 30,
    z: 200
  }
}

export const LightData = {
  type: 'DirectionalLight'
}