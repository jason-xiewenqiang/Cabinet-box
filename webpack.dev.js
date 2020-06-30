const merge = require('webpack-merge');
const base = require('./webpack.config');
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const pathContext = ['/api', '/mock/35'];
const proxyHost = '192.168.2.243:80';

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    hot: true,
    port: 8000,
    host: '0.0.0.0',
    open: true,
    compress: true,
    useLocalIp: false,
    contentBase: './',
    clientLogLevel: 'error',
    disableHostCheck: true,
    historyApiFallback: true,
    proxy: getProxyMaps()
  },
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 300
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

function getProxyMaps () {
  const maps = {}
  pathContext.forEach((item) => {
    maps[item] = {
      target: 'http://' + proxyHost,
      secure: false,
      changeOrigin: true,
      bypass (req, res) {
        const isEixit = fs.existsSync(path.join(__dirname, './mock', 'map.config'))
        if (isEixit) {
          let map = fs.readFileSync(path.join(__dirname, './mock', 'map.config'), 'utf-8')
          map = map.replace(/\s*\/\/.*(?:\r|\n|$)/g, '').trim()
          if (map) {
            try {
              map = JSON.parse(map)
            } catch (e) {
              map = ''
              console.error('---------------mock file error-----------------')
            }
            for (let x in map) {
              if (req.url.indexOf(x) > -1) {
                console.log(
                  'mapped:', path.join(__dirname, './mock', map[x]).replace(/\\/g, '/')
                )
                res.sendFile(path.join(__dirname, './mock', map[x]))
              }
            }
          }
        }
      }
    }
  })
  return maps
}
