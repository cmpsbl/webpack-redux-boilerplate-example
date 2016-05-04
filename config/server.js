import _debug from 'debug';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import { serverConfig } from './index';
import webpackConfig from '../webpack.config';

const debug = _debug('app:server');
const { port, host } = serverConfig;

debug('Creating a new Webpack dev server');
const app = new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  progress: true,
  stats: {
    colors: true,
    chunks: false,
    errorDetails: true,
  },
});

debug(`Listening the server at http://${host}:${port}.`);
app.listen(port, host, (err) => {
  if (err) {
    return debug(err);
  }

  return debug('Running the server. This will take a moment...');
});
