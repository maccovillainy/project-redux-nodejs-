const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack')
const path = require('path')
const extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});
module.exports = {
  watch: true,
  devtool: "inline-source-map",
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, "public")
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 8080,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules)/,
        use:[
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react', 'stage-0']
            }
          }
        ]
      },
      {
        test: /\.sass$|\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader']
        })
      }
    ]
  },
  plugins: [
    extractPlugin,
    new webpack.HotModuleReplacementPlugin()
  ]
};