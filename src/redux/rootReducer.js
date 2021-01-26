import { combineReducers } from 'redux';

import marketReducer from './market/marketReducer';
import userReducer from './user/userReducer';
import searchReducer from './seach/searchReducer';
import productReducer from './product/productReducer';

const rootReducer = combineReducers({
  user: userReducer,
  market: marketReducer,
  search: searchReducer,
  product: productReducer,
});

export default rootReducer;
