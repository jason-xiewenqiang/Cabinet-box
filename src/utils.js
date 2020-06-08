export const loadTexture = (src, render) => {
  const loader = new THREE.TextureLoader()
  return loader.load(src, () => {render()})
}