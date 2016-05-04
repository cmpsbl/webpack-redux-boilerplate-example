import { combineReducers } from 'redux';
import counter from './counter';

const rootReducer = combineReducers({
  // state: (state = {}) => state,
  counter,
});

export default rootReducer;
