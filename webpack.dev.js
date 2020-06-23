const merge = require('webpack-merge');
const base = require('./webpack.config');
const webpack = require('webpack');
// const fs = require('fs');
// const path = require('path');
// const pathContext = ['/api'];
// const proxyHost = 'localhost:3000';

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    hot: true,
    port: 8000,
    host: '0.0.0.0',
    compress: true,
    useLocalIp: false,
    contentBase: './',
    clientLogLevel: 'error',
    disableHostCheck: true,
    historyApiFallback: true,
    proxy: {}
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