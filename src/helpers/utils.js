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

// Convert Mongoose generated Date to Human readable date format
export function getFormattedDate (rawDate) {
  let newDate = new Date(rawDate);

  let month
  let day;
  let year = newDate.getFullYear().toString();

  month = numToMonth(parseInt(newDate.getMonth() + 1, 10));

  if (newDate.getDate() < 10) {
    day = '0' + newDate.getDate();
  } else {
    day = newDate.getDate().toString();
  }

  return `${month} ${day}, ${year}`;
}

export function numToMonth(month) {
  switch(month){
    case 1:
      return 'Jan';
    case 2:
      return 'Feb';
    case 3:
      return 'Mar';
    case 4:
      return 'Apr';
    case 5:
      return 'May';
    case 6:
      return 'Jun';
    case 7:
      return 'Jul';
    case 8:
      return 'Aug';
    case 9:
      return 'Sep';
    case 10:
      return 'Oct';
    case 11:
      return 'Nov';
    case 12:
      return 'Dec';
    default:
      return '';
  }
}