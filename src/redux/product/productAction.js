import {
  ADD_PRODUCT,
  POST_PRODUCT_FAILURE,
  POST_PRODUCT_SUCCESS,
  EDIT_PRODUCT,
  EDIT_PRODUCT_SHIPPED,
  EDIT_PRODUCT_DESCRIPTION,
  EDIT_PRODUCT_PRICE,
} from './productTypes';

export const addProduct = (product = {}) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

export const editProduct = (edit) => {
  return {
    type: EDIT_PRODUCT,
    payload: edit,
  };
};

export const editProductShipped = (shipped) => {
  return {
    type: EDIT_PRODUCT_SHIPPED,
    payload: shipped,
  };
};

export const editProductDescription = (description) => {
  return {
    type: EDIT_PRODUCT_DESCRIPTION,
    payload: description,
  };
};
export const editProductPrice = (price) => {
  return {
    type: EDIT_PRODUCT_PRICE,
    payload: price,
  };
};

export const postProductFailure = (error) => {
  return {
    type: POST_PRODUCT_FAILURE,
    payload: error,
  };
};

export const postProductSuccess = (success) => {
  return {
    type: POST_PRODUCT_SUCCESS,
    payload: success,
  };
};
