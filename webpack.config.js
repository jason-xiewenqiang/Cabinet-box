const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebapckPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {index: path.join(__dirname, 'src/index.js')},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash:6].js',
    chunkFilename: 'js/[name].[chunkhash:6].js'
  },
  plugins:[
    new HtmlWebapckPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: `index.html`,
      chunks: 'index',
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new CopyWebpackPlugin({patterns: [{from: 'js/*.js', to: 'js'}]})
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
      },
      {
        test:/\.(png|jpg|jpeg|gif|svg)$/,
          use:[
            {
              loader:"url-loader",
              options:{
                  limit:50000,   //表示低于50000字节（50K）的图片会以 base64编码
                  outputPath:"./images",
                  name: '[name].[hash:5].[ext]',
                  pulbicPath:"./dist/images",
                  esModule: false,
              },
          }
        ]
      }
    ]
  }
}