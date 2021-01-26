import {
  CREATE_MARKET,
  HANDLE_MARKET_MODAL,
  ADD_MARKET_TAG,
  ADD_MARKET_NAME,
  REMOVE_MARKET_TAG,
} from './marketTypes';

export const createMarket = () => {
  return {
    type: CREATE_MARKET,
  };
};

export const handleMarketModal = () => {
  return {
    type: HANDLE_MARKET_MODAL,
  };
};

export const addMarketTag = (tag = []) => {
  return {
    type: ADD_MARKET_TAG,
    payload: tag,
  };
};

export const removeMarketTag = (tag = '') => {
  return {
    type: REMOVE_MARKET_TAG,
    payload: tag,
  };
};

export const addMarketName = (name = '') => {
  return {
    type: ADD_MARKET_NAME,
    payload: name,
  };
};
