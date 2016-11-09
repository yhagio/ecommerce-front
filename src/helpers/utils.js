// Check if the user is authenticated.
// Used in checkAuthentication() in routes "onEnter"
export function checkIfAuthenticated (store, token) {
  // Check if the user has the token, if not,
  // make sure to check in the localstorage! (double check)
  if (!token) {
    if (!localStorage.getItem('token')) return false; 
  }

  if (store.getState().user.isAuthenticated === true) return true;

  return false;
}

// Set headers : Authorization with JSON Web Token
export function setHeaders () {
  const token = localStorage.getItem('token');
  let config = {};
  config = {
    headers: { 'Authorization': `Bearer ${token}` }
  };
  return config;
}
