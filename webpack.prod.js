
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const base = require('./webpack.config');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasureWebpackPlugin();
const config = merge(base, {
  output: {
    publicPath: './'
  },
  mode: 'production',
  devtool: 'none',
  watch: false,
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ]
})

module.exports = smp.wrap(config);