/* eslint no-unused-vars: "off" */
import webpack from 'webpack';
import colors from 'colors';
import _debug from 'debug';

import { ENV } from './index';
import webpackConfig from '../webpack.config';

const debug = _debug('app:compiler');

debug(`Generating minified bundles for ${ENV.toUpperCase()}. This will take a moment...`);
webpack(webpackConfig).run((err, stats) => {
  // Show fatal errors and exit
  if (err) {
    debug('Webpack compiler encountered a FATAL error.'.red, err);
    return 1;
  }

  const jsonStats = stats.toJson();
  const strStats = stats.toString({
    chunks: false,
    errorDetails: false,
  });

  // Show stats errors and exit
  if (jsonStats.errors.length > 0) {
    debug('Webpack compiler encountered errors.'.red);
    return jsonStats.errors.map(error => debug(error.red));
  }

  // Stats stats warnings
  if (jsonStats.warnings.length > 0) {
    debug('Webpack compiler encountered warnings.'.yellow);
    jsonStats.warnings.map(warning => debug(warning.yellow));
  }

  // Result
  debug(`Webpack stats: ${strStats}`);
  debug('Compiling finished.');

  return 0;
});
