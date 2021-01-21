import { combineReducers } from 'redux';

import marketReducer from './market/marketReducer';
import userReducer from './user/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  market: marketReducer,
});

export default rootReducer;
