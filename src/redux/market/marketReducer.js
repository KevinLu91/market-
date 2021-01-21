import { CREATE_MARKET, CREATE_MARKET_MODAL } from './marketTypes';

const initialState = {
  createModal: false,
  inputValue: '',
  selectedTags: [],
  selectedTag: '',
};

const marketReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MARKET:
      return {
        ...state,
      };
    case CREATE_MARKET_MODAL:
      return {
        createModal: !state.createModal,
        inputValue: '',
        selectedTags: [],
        selectedTag: '',
      };
    default:
      return state;
  }
};

export default marketReducer;
