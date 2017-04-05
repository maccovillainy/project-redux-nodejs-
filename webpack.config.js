module.exports = {

  watch: true,

  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: './public'
  },

  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query:{
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  }
};