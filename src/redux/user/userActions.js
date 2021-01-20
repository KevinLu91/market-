import { GET_USER } from './userTypes';

export const getUser = (user = null) => {
  return {
    type: GET_USER,
    payload: user,
  };
};
