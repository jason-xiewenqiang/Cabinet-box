/**
 * 安装本地环境包 (已经安装了node环境, 没有安装请自行下载node安装包)
 * npm install express 
 * 运行本地服务
 * node server.js 8000
 */
const Express = require('express')

let port = process.argv[2] || 8000
const app = Express()

app.use(Express.static(__dirname))

app.listen(port, function() {
	console.log(`服务器已启动 => ${port}`)
})