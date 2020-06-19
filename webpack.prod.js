
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const base = require('./webpack.config');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasureWebpackPlugin();
const TerserPlugin = require('terser-webpack-plugin');
const config = merge(base, {
  output: {
    publicPath: './'
  },
  mode: 'production',
  devtool: 'none',
  watch: false,
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ],
  optimization: {
    splitChunks: {
      name: true,
      chunks: 'all',
      minSize: 200000, // 20k
      minChunks: 1,
      maxAsyncRequests: 100,
      maxInitialRequests: 100,
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -80,
          chunks: 'all',
          reuseExistingChunk: true,
        },
      }
    },
    runtimeChunk:{
      name: 'manifest'
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true
      })
    ]
  }
})

module.exports = smp.wrap(config);