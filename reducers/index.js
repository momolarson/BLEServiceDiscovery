import { combineReducers } from 'redux';

import BLEReducer from './BLEReducer';

export default combineReducers({
    BLEs: BLEReducer,
  });