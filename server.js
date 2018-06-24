import express, { static } from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/'
}));

app.use(static(__dirname + '/public'));

const server = app.listen(process.env.PORT || 5000, function() {
  console.log('Biscuit Machine app is listening at http://localhost:5000');
});