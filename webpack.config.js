const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebapckPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {index: path.join(__dirname, 'src/main.js')},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash:6].js',
    chunkFilename: 'js/[name].[chunkhash:6].js'
  },
  plugins:[
    new HtmlWebapckPlugin({
      template: path.resolve(__dirname, 'main.html'),
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
    new CopyWebpackPlugin({patterns: [{from: 'js/*.js', to: ''}]}),
    new CopyWebpackPlugin({patterns: [{from: 'images/*', to: ''}]})
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
                  limit: 1000,
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