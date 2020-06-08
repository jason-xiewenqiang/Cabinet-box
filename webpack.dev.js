const merge = require('webpack-merge');
const base = require('./webpack.config');
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const pathContext = ['/api'];
const proxyHost = 'localhost:3000';

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    hot: true,
    port: 8000,
    host: 'localhost',
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

function getProxyMaps() {
  const maps = {}
  pathContext.forEach((item) => {
    maps[item] = {
      target: 'http://' + proxyHost,
      secure: false,
      changeOrigin: true,
      bypass(req, res, proxyOptions) {
        console.log(req.url)
        if (fs.existsSync(path.join(__dirname, './mock', 'map-local.config'))) {
          let map = fs.readFileSync(path.join(__dirname, './mock', 'map-local.config'), 'utf-8')
          console.log(map)
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
                console.log( 'mapped local:', path.join(__dirname, './mock', map[x]).replace(/\\/g, '/')
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