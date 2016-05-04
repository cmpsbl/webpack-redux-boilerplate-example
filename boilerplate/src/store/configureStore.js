if (__PROD__) {
  module.exports = require('./configureStore.prod');
} else {
  // Double check the current environment
  console.log(`__PROD__: ${__PROD__} in configureStore`);
  module.exports = require('./configureStore.dev');
}
