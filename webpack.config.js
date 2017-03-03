module.exports = {
  entry: "./lib/rush_city.js",
  output: {
    filename: "./bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["*", ".js"]
  }
};
