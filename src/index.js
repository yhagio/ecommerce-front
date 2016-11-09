import React from 'react';
import { render } from 'react-dom';
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import {
  authenticateUser,
  fetchingUser,
  fetchingUserSuccess,
  fetchingUserFailure
} from './redux/User';
import getRoutes from './routes';

import products from './redux/Products';
import product from './redux/Product';
import user from './redux/User';
import signup from './redux/Signup';
import signin from './redux/Signin';

import { ROOT_URL } from './constants';
import { checkIfAuthenticated, setHeaders } from './helpers/utils';

const store = createStore(combineReducers({
  products,
  product,
  user,
  signup,
  signin
}), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
));

// Check if the user is authenticated initially
const token = localStorage.getItem('token');
// Initial load of page or when user refresh the page,
// if user is already signed in, user has the token.
// So go ahead fetch the user data from the server
if (token) {
  store.dispatch(authenticateUser());
  store.dispatch(fetchingUser());
  axios.get(`${ROOT_URL}/auth/userdata`, setHeaders())
    .then((res) => store.dispatch(fetchingUserSuccess(res.data)))
    .catch((err) => store.dispatch(fetchingUserFailure(err)));
}

// Check if the user is authenticated.
const isAuthenticated = checkIfAuthenticated(store, token);

// Check if user is authenticated before letting the user
// access to certain routes
function checkAuthentication (nextState, replace) {
  const nextPathName = nextState.location.pathname;
  
  if (nextPathName === '/' || nextPathName === '/signin') {
    // When the user is authenticated, redirect to /account
    if (store.getState().user.get('isAuthenticated') === true && localStorage.getItem('token')) {
      replace('/account');
    }
  } else {
    // When the user is NOT authenticated, redirect to /signin
    if (store.getState().user.get('isAuthenticated') !== true || !localStorage.getItem('token')) {
      replace('/signin');
    }
  }
}

render(
  <Provider store={ store } >
    { getRoutes(checkAuthentication) }
  </Provider>,
  document.getElementById('root')
);
