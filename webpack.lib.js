const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
module.exports = {
    mode: 'none',
    entry: {
        'cabinet': './src/mySprite.js',
        'cabinet.min': './src/mySprite.js'
    },
    output: {
        filename: '[name].js',
        library: 'Cabinet', // 导出的库名称
        libraryExport: 'default',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'lib'),
    },
    plugins: [
      new CleanWebpackPlugin(['lib']),
      new CopyWebpackPlugin({patterns: [{from: 'js/*.js', to: ''}]}),
      new CopyWebpackPlugin({patterns: [{from: 'main.html', to: ''}]}),
      new CopyWebpackPlugin({patterns: [{from: 'images/*.png', to: ''}]}),
      new CopyWebpackPlugin({patterns: [{from: 'css/*.css', to: ''}]}),
      new CopyWebpackPlugin({patterns: [{from: 'images/*.svg', to: ''}]})
    ],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          include: path.resolve(__dirname, 'src'),
          use: [{
              loader: 'thread-loader',
              options: {
                workers: 4
              }
            },
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true
              }
            }
          ]
        }
      ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({ // 遇见es6会进行转换
                include: /\.min\.js$/
            })
        ]
    }
}