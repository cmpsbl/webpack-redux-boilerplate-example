import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import createLogger from 'redux-logger';

// Console log states and actions
const logger = createLogger();

// Compose several store enhancers into one
const storeEnhancer = compose(
  // ------------------------------------
  // Middlewares
  // ------------------------------------
  // Add middlewares like redux-thunk, etc.
  applyMiddleware(logger),

  // Required. Enable Redux DevTools with the chosen monitors
  DevTools.instrument(),

  // Optional. Let us write ?debug_session=<key> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&#]+)\b/))
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, storeEnhancer);

  // Hot reload reducers (requires Webpack HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}
