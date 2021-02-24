import { GET_USER, GET_USER_CREDENTIALS, GET_USER_PROFILE } from './userTypes';

const initialState = {
  user: null,
  error: '',
  userCredentials: null,
  profile: '',
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
    case GET_USER_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
