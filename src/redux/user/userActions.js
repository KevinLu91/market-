import { GET_USER, GET_USER_CREDENTIALS } from './userTypes';

export const getUser = (user = null) => {
  return {
    type: GET_USER,
    payload: user,
  };
};

export const getUserCredentials = (credentials = null) => {
  return {
    type: GET_USER_CREDENTIALS,
    payload: credentials,
  };
};
