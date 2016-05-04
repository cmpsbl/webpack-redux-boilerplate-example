import React from 'react';
import ReactDOM from 'react-dom';
import Redbox from 'redbox-react';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store/configureStore';
import Root from './containers/Root';

// Utilize Redbox and enhance debugging experience
const consoleErrorReporter = ({ error }) => {
  console.log(error);
  return <Redbox error={error} />;
};

consoleErrorReporter.propTypes = {
  error: React.PropTypes.error,
};

// ------------------------------------
// Store
// ------------------------------------
// Create a store with configruations based on environment variables
const store = configureStore();

ReactDOM.render(
  // ------------------------------------
  // React Hot Loader 3
  // ------------------------------------
  // In production, AppContainer just renders your root component
  // In development, it handles hot reloading and error handling
  <AppContainer errorReporter={consoleErrorReporter}>
    <Root store={store} />
  </AppContainer>,
  document.querySelector('.container')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextApp = require('./containers/Root').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>,
      document.querySelector('.container')
    );
  });
}
