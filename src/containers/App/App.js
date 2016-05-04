import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import * as CounterActions from '../../actions/CounterActions';
import logo from '../../static/logo.png';
import Counter from '../../components/Counter';
import Footer from '../../components/Footer';
import styles from './App.css';

class App extends Component {
  render() {
    const { counter, actions } = this.props;
    return (
      <div className="main-app-container">
        <div styleName="header">Webpack Redux Boilerplate</div>
        <img src={logo} alt="logo" />
        <Counter counter={counter} actions={actions} />
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  counter: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CounterActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CSSModules(App, styles));
