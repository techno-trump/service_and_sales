import axios from 'axios';
import { getJWTToken } from '../auth';

const API_URL = '/api/v1';
const TIME_ZONE_OFFSET = -new Date().getTimezoneOffset();

axios.interceptors.request.use(config => {
  const headers = { XTimezoneOffset: TIME_ZONE_OFFSET };

  const token = getJWTToken();
  if (token) headers['Authorization'] = token;
    console.log('interceptors');
  config.headers = headers;
  return config;
});

class Api {
  async localAuth(params) {
    return await axios.post(`${API_URL}/user/login`, params)
      .catch(ex => console.log(ex));
  }
  async fetchUsers(filter, pagination) {
    return await axios.get(`${API_URL}/user/list`).catch(ex => null);
  }
}

export default new Api();

export function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}