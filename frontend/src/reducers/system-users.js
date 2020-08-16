import { FETCH_USERS_BEGIN, FETCH_USERS_ERROR, FETCH_USERS_SUCCESS } from '../actions/types';

const INITIAL_STATE = { records: [], isFetching: false, error: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USERS_BEGIN:
      return { ...state, isFetching: true, error: null };
    case FETCH_USERS_ERROR:
      return { ...state, isFetching: false, error: action.payload.error };
    case FETCH_USERS_SUCCESS:
      return { ...state, isFetching: false, error: null, records: action.payload.records };
    default:
      return state;
  }
}