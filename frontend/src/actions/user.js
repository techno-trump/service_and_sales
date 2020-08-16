import { USER_LOGGED_IN, USER_LOGGED_OUT } from './types';
import api from '../api';
import jwt from 'jsonwebtoken';

export const login = data => {
  return async (dispatch) => {
    const { login, password } = data;
    try {
      const res = await api.localAuth({ login, password });
      const token = res && res.data && res.data.token;
      
      if (token) {
        const payload = jwt.decode(token);
          console.log(payload);
        sessionStorage.setItem('jwtToken', token);
        dispatch({ type: USER_LOGGED_IN, payload });
        return payload;
      } else {
        console.log('No token');
      }
    } catch (ex) {
      console.log(ex);
    }
  };
}
export const logout = () => {
  return async (dispatch) => {
    sessionStorage.removeItem('jwtToken');
    dispatch({ type: USER_LOGGED_OUT });
  };
}