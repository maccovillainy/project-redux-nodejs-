module.exports = {
  watch: true,
  entry: './app.jsx',
  output: {
    filename: 'bundle.js',
    path: './public'
  },
  module:{
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015',"stage-0", 'react']
        }
      }
    ]
  }
}