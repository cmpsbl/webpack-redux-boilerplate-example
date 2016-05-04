// ------------------------------------
// Root component
// ------------------------------------
// Configure 'Root' component based on the environment variables.
// This is typically surrounded by a `<Provider>` that holds state.
if (__PROD__) {
  module.exports = require('./Root.prod');
} else {
  // Double check the current environment
  console.log(`__PROD__: ${__PROD__} in Root`);
  module.exports = require('./Root.dev');
}

// ------------------------------------
// NOTICE: REACT-HOT-LOADER 3
// ------------------------------------
// If you use React Router, make this component render <Router> with your routes.
// Currently, only synchronous routes are hot reloaded, and you will see a warning
// from <Router> on every reload. You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182
