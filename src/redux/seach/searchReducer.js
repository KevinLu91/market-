import {
  FETCH_SEARCH_FAILURE,
  FETCH_SEARCH_SUCCESS,
  FETCH_SEARCH_REQUEST,
} from './searchTypes';

const initialState = {
  isSearching: false,
  searchResults: [],
  error: '',
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SEARCH_REQUEST:
      return {
        ...state,
        isSearching: true,
      };
    case FETCH_SEARCH_SUCCESS:
      return {
        isSearching: false,
        searchResults: action.payload,
        error: '',
      };
    case FETCH_SEARCH_FAILURE:
      return {
        isSearching: false,
        searchResults: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
