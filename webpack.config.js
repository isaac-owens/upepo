module.exports = {
  entry: ["babel-polyfill", "./src/upepo.js"],
  output: {
    path: __dirname + "/dist",
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(wav)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "sounds/",
            publicPath: "./dist/sounds/",
          },
        },
      },
      {
        test: /\.(png)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/",
            publicPath: "./dist/images/",
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", "*"],
  },
  devServer: {
    contentBase: ".",
  },
};