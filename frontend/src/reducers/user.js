import { isAuthorized } from '../auth';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../actions/types';

const INITIAL_STATE = { authenticated: isAuthorized() };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, authenticated: true, ...action.payload };
    case USER_LOGGED_OUT:
      return { authenticated: false };
    default:
      return state;
  }
}