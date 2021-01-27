import {
  ADD_PRODUCT,
  INITAL_PRODUCT,
  TAB_INDEX,
  POST_PRODUCT_FAILURE,
  POST_PRODUCT_SUCCESS,
} from './productTypes';

const initialState = {
  tab: 0,
  addProduct: {},
  error: false,
  success: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        addProduct: action.payload,
      };
    case TAB_INDEX:
      return {
        ...state,
        tab: action.payload,
      };
    case INITAL_PRODUCT:
      return {
        ...state,
        addProcut: {},
      };
    case POST_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case POST_PRODUCT_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
