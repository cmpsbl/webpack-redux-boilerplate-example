/* eslint quote-props: ["off"] */
import _debug from 'debug';

const debug = _debug('app:config');
debug('Loading configuration.');

// ----------------------------------
// Environments
// ----------------------------------
export const ENV = process.env.NODE_ENV || 'development';
export const environConfig = {
  'process.env.NODE_ENV': JSON.stringify(ENV),

  // Include them in .eslintrc as well
  __DEV__: ENV === 'development',
  __PROD__: ENV === 'production',
  __TEST__: ENV === 'test',
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')),
};

// ----------------------------------
// Server Configuration
// ----------------------------------
export const serverConfig = {
  host: 'localhost',
  port: process.env.PORT || 3000,
};
