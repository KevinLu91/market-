import { CREATE_PRODUCT, INITAL_PRODUCT } from './productTypes';

const initialState = {
  description: '',
  price: '',
  shipped: false,
  image: '',
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return {
        description: action.payload.description,
        price: action.payload.price,
        shipped: action.payload.shipped,
        image: action.payload.image,
      };
    case INITAL_PRODUCT:
      return {
        initialState,
      };
    default:
      return state;
  }
};

export default productReducer;
