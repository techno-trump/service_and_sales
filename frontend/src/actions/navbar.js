import { TOGGLE_NAVBAR_VISIBILITY } from './types';

export const toggleNavbarVisibility = () => {
    console.log(toggleNavbarVisibility);
  return (dispatch) => {
    dispatch({ type: TOGGLE_NAVBAR_VISIBILITY });
  };
}