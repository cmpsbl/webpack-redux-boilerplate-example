import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import DevTools from './DevTools';

// Redux DevTools Instructions
console.log('ctrl-h to toggle Redux DevTools');
console.log('ctrl-q to change its Positions');

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props;
    return (
      // ----------------------------------
      // Provider
      // ----------------------------------
      // Provided by the 'react-redux' bindings that wraps our app.
      // Makes the Redux store/state available to `connect()` calls.
      <Provider store={store}>
        <div>
          <App />
          <DevTools />
        </div>
      </Provider>
    );
  }
}
