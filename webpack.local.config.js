var webpack = require('webpack');

module.exports = {
  devtool: "eval",

  entry: [
    "webpack-dev-server/client?http://localhost:7666",
    "webpack/hot/only-dev-server",
    "./src/app"
  ],

  output: {
    path: __dirname + "/build/",
    filename: "app.js",
    publicPath: "http://localhost:7666/build/"
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["react-hot", "babel"]},
      { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded" }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
