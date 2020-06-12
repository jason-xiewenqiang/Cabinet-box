export const loadTexture = (src, render) => {
  const loader = new THREE.TextureLoader()
  return loader.load(src, () => {render()})
}
export const randomColor = () => {
    let str = "#"
    const arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
    for (let i = 0; i < 6; i++) {
      const num = parseInt(Math.random() * 16)
      str += arr[num]
    }
    return str
}