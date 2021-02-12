const path = require('path');

module.exports = {
  mode: "production",
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "public/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg)$/,
        use: [{loader: "file-loader"}]
      }
    ]
  },
  watch: false
}