import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import getRoutes from './routes';
import products from './redux/Products';
import product from './redux/Product';

const store = createStore(combineReducers({
  products,
  product,
}), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
));

// TODO: Check if the user is authenticated initially

render(
  <Provider store={ store } >
    { getRoutes(browserHistory) }
  </Provider>,
  document.getElementById('root')
);
