import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import MainContainer from './containers/MainContainer';
import ProductsContainer from './containers/ProductsContainer';
import ProductContainer from './containers/ProductContainer';
import AccountContainer from './containers/AccountContainer';
import SignupContainer from './containers/SignupContainer';
import SigninContainer from './containers/SigninContainer';
import CartContainer from './containers/CartContainer';
import SignoutContainer from './containers/SignoutContainer';

export default function getRoutes (checkAuthentication) {
  return (
    <Router history={ browserHistory } >
      <Route path='/' component={ MainContainer } >
        <IndexRoute component={ ProductsContainer } />
        <Route path='/products/:id' component={ ProductContainer } />
        <Route path='/cart' component={ CartContainer } onEnter={ checkAuthentication } />
        <Route path='/account' component={ AccountContainer } onEnter={ checkAuthentication } />
        <Route path='/signup' component={ SignupContainer } />
        <Route path='/signin' component={ SigninContainer } />
        <Route path='/signout' component={ SignoutContainer } />
        <Route path='*' component={ ProductsContainer } />
      </Route>
    </Router>
  );
}