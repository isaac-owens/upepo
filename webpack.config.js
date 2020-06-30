module.exports = {
  entry: ['babel-polyfill', './src/upepo.js'],
  output: {
    path: __dirname + '/dist',
    // publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/, 
        exclude: /node_modules/,
        use: { 
          loader: 'babel-loader' 
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '*']
  },
  devServer: {
    contentBase: './dist'
  }
};