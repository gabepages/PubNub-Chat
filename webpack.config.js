module.exports = {
  entry: './src/scripts/index.js',
  output: {
          filename: "./bundle.js",
          sourceMapFilename: "./bundle.map"
      },
  devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
};
