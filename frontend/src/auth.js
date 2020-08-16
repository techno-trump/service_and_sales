export const getJWTToken = () => {
    console.log('getJWTToken');
  return sessionStorage.getItem('jwtToken');
};

export const isAuthorized = () => {
  return Boolean(getJWTToken());
};