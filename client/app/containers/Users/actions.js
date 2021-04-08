/*
 *
 * Users actions
 *
 */

import axios from 'axios';

import { FETCH_USERS } from './constants';

import handleError from '../../utils/error';

export const fetchUsers = filter => {
  return async (dispatch, getState) => {
    
    try {
      const response = await axios.get(`/api/user/list`, {
        params: {
          search: filter?.value
        }
      });
      dispatch({ type: FETCH_USERS, payload: response.data.users });
    } catch (error) {
      console.log(error, 'error in search');
      
      handleError(error, dispatch);
    }
  };
};


export const approveMerchantRequest = filter => {
  return async (dispatch, getState) => {
    
    try {
      const response = await axios.get(`/api/user/list`, {
        params: {
          search: filter?.value
        }
      });
      dispatch({ type: FETCH_USERS, payload: response.data.users });
    } catch (error) {
      console.log(error, 'error in search');
      
      handleError(error, dispatch);
    }
  };
};



export const searchUsers = filter => {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchUsers(filter));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};
