import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import MainContainer from './containers/MainContainer';
import ProductsContainer from './containers/ProductsContainer';
import ProductContainer from './containers/ProductContainer';
import AccountContainer from './containers/AccountContainer';
import SignupContainer from './containers/SignupContainer';
import SigninContainer from './containers/SigninContainer';
import CartContainer from './containers/CartContainer';

export default function getRoutes (history) {
  return (
    <Router history={ history } >
      <Route path='/' component={ MainContainer } >
        <IndexRoute component={ ProductsContainer } />
        <Route path='/products/:id' component={ ProductContainer } />
        <Route path='/cart' component={ CartContainer } />
        <Route path='/account' component={ AccountContainer } />
        <Route path='/signup' component={ SignupContainer } />
        <Route path='/signin' component={ SigninContainer } />
        <Route path='*' component={ ProductsContainer } />
      </Route>
    </Router>
  );
}