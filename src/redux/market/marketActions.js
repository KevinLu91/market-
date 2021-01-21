import { CREATE_MARKET, CREATE_MARKET_MODAL } from './marketTypes';

export const createMarket = () => {
  return {
    type: CREATE_MARKET,
  };
};

export const createModal = () => {
  return {
    type: CREATE_MARKET_MODAL,
  };
};
