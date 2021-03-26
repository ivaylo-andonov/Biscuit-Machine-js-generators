const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    'babel-polyfill', './index.js',
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  cache: true,
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};