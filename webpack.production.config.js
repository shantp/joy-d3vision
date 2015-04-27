var webpack = require('webpack');

module.exports = {
  entry: "./src/app",

  output: {
    path: __dirname + "/build/",
    filename: "app.js"
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded" }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}