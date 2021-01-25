import { API, graphqlOperation } from 'aws-amplify';
import { searchMarkets } from '../../graphql/queries';
import {
  FETCH_SEARCH_FAILURE,
  FETCH_SEARCH_SUCCESS,
  FETCH_SEARCH_REQUEST,
} from './searchTypes';

export const fetchSearchResults = (searchTerm = '') => {
  return {
    type: FETCH_SEARCH_REQUEST,
    payload: searchTerm,
  };
};

const fetchSearchSuccess = (data) => {
  return {
    type: FETCH_SEARCH_SUCCESS,
    payload: data,
  };
};

const fetchSearchFailure = (error) => {
  return {
    type: FETCH_SEARCH_FAILURE,
    payload: error,
  };
};

export const fetchSearch = (searchTerm = '') => {
  return (dispatch) => {
    dispatch(fetchSearchResults);
    console.log(searchTerm);
    API.graphql(
      graphqlOperation(searchMarkets, {
        filter: {
          or: [
            { name: { matchPhrasePrefix: searchTerm } },
            { owner: { matchPhrasePrefix: searchTerm } },
            { tags: { matchPhrasePrefix: searchTerm } },
          ],
        },
      })
    )
      .then((res) => {
        dispatch(fetchSearchSuccess(res.data.searchMarkets.items));
      })
      .catch((err) => {
        console.log(err);
        //err.message
        dispatch(fetchSearchFailure(err));
      });
  };
};
