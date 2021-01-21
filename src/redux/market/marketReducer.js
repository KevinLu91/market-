import {
  CREATE_MARKET,
  HANDLE_MARKET_MODAL,
  ADD_MARKET_TAG,
  REMOVE_MARKET_TAG,
  ADD_MARKET_NAME,
} from './marketTypes';

const initialState = {
  createModal: false,
  name: '',
  selectedTags: [],
};

const marketReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MARKET:
      return {
        ...state,
      };
    case HANDLE_MARKET_MODAL:
      return {
        createModal: !state.createModal,
        name: '',
        selectedTags: [],
      };
    case ADD_MARKET_TAG:
      return {
        ...state,
        selectedTags: [...state.selectedTags, action.payload],
      };
    case REMOVE_MARKET_TAG:
      return {
        ...state,
        selectedTags: state.selectedTags.filter(
          (tag) => tag !== action.payload
        ),
      };
    case ADD_MARKET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};

export default marketReducer;
