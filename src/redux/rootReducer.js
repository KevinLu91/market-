import { combineReducers } from 'redux';

import marketReducer from './market/marketReducer';
import userReducer from './user/userReducer';
import searchReducer from './seach/searchReducer';

const rootReducer = combineReducers({
  user: userReducer,
  market: marketReducer,
  search: searchReducer,
});

export default rootReducer;
