import { GET_USER, GET_USER_CREDENTIALS } from './userTypes';

const initialState = {
  user: null,
  error: '',
  userCredentials: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USER_CREDENTIALS:
      return {
        ...state,
        userCredentials: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
