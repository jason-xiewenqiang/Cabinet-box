require('colors')
const Express = require('express')

let port = process.argv[2] || 8000
const app = Express()

app.use(Express.static(__dirname))

app.listen(port, function() {
	console.log(`服务器已启动 => ${port}`.bgMagenta)
})
