import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

// ------------------------------------
// Loaders
// ------------------------------------
// Add middlewares like redux-thunk, etc.
const storeEnhancer = applyMiddleware();

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, storeEnhancer);
}
