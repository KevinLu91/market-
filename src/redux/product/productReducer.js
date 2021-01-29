import {
  ADD_PRODUCT,
  EDIT_PRODUCT,
  POST_PRODUCT_FAILURE,
  POST_PRODUCT_SUCCESS,
  EDIT_PRODUCT_SHIPPED,
  EDIT_PRODUCT_DESCRIPTION,
  EDIT_PRODUCT_PRICE,
} from './productTypes';

const initialState = {
  editProduct: false,
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
    case EDIT_PRODUCT: {
      return {
        ...state,
        editProduct: action.payload,
      };
    }
    case EDIT_PRODUCT_SHIPPED: {
      return {
        ...state,
        addProduct: { ...state.addProduct, shipped: action.payload },
      };
    }
    case EDIT_PRODUCT_DESCRIPTION: {
      return {
        ...state,
        addProduct: { ...state.addProduct, description: action.payload },
      };
    }
    case EDIT_PRODUCT_PRICE: {
      return {
        ...state,
        addProduct: { ...state.addProduct, price: action.payload },
      };
    }
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
