import {
  ADD_PRODUCT,
  INITAL_PRODUCT,
  TAB_INDEX,
  POST_PRODUCT_FAILURE,
  POST_PRODUCT_SUCCESS,
} from './productTypes';

export const addProduct = (product = {}) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

export const tabIndex = (index) => {
  return {
    type: TAB_INDEX,
    payload: index,
  };
};

export const postProductFailure = (error) => {
  return {
    type: POST_PRODUCT_FAILURE,
    payload: error,
  };
};

export const initalProduct = () => {
  return {
    type: INITAL_PRODUCT,
  };
};

export const postProductSuccess = (success) => {
  return {
    type: POST_PRODUCT_SUCCESS,
    payload: success,
  };
};
