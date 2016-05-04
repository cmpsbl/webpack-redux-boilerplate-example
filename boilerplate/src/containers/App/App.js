import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.css';

// ------------------------------------
// Main App component
// ------------------------------------
// It is common practice to have a 'Root' container/component require our main App (this one).
// Again, this is because it serves to wrap the rest of our application with the Provider
// component to make the Redux store available to the rest of the app.

class App extends Component {
  render() {
    return (
      <div styleName="header">
        Webpack Redux Boilerplate
      </div>
    );
  }
}

export default CSSModules(App, styles)
