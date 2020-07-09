module.exports = {
  entry: ['babel-polyfill', './src/upepo.js'],
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist/', 
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/, 
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(wav)$/, 
        exclude: /node_modules/,
        use: ['file-loader']
      },
      {
        test: /\.(png)$/, 
        exclude: /node_modules/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '*']
  },
  devServer: {
    contentBase: '.'
  }
};