import { TOGGLE_NAVBAR_VISIBILITY } from '../actions/types';

const INITIAL_STATE = { visible: true, minimized: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_NAVBAR_VISIBILITY:
      return { ...state, visible: !state.visible };
    default:
      return state;
  }
}