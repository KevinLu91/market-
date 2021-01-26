import { CREATE_PRODUCT, INITAL_PRODUCT } from './productTypes';

export const createMarketProduct = (product = {}) => {
  return {
    type: CREATE_PRODUCT,
    payload: product,
  };
};

export const initalProduct = () => {
  return {
    type: INITAL_PRODUCT,
  };
};
