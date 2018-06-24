const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/'
}));

app.use(express.static(__dirname + '/public'));

const server = app.listen(process.env.PORT || 5000, function() {
  console.log('Biscuit Machine app is listening at http://localhost:5000');
});