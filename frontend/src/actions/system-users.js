import { FETCH_USERS_BEGIN, FETCH_USERS_ERROR, FETCH_USERS_SUCCESS } from './types';
import api from '../api';

export const fetchUsers = (filter, pagination) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USERS_BEGIN });
    try {
      const res = await api.fetchUsers(filter, pagination);
        console.log(res.data);
      dispatch({ type: FETCH_USERS_SUCCESS, payload: { records: res.data } });
    } catch (ex) {
      dispatch({ type: FETCH_USERS_ERROR, payload: { error: ex } });
    }
  };
}