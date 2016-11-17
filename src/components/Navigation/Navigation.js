import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import './navigation.css';

export function Links({ isAuthenticated }) {
  return isAuthenticated
    ? <span>
        <Link to="/signout" className="item right" tabIndex="6" role="link">Sign out</Link>
        <Link to="/account" className="item right" tabIndex="5" role="link">Account</Link>
        <Link to="/cart" className="item right" tabIndex="4" role="link">Cart</Link>
      </span>
    : <span>
        <Link to="/signin" className="item right" tabIndex="5" role="link">Sign in</Link>
        <Link to="/signup" className="item right" tabIndex="4" role="link">Sign up</Link>
      </span>;
}

export default function Navigation ({ isAuthenticated }) {
  return (
    <nav>
      <div className="navBar">
        <Link to="/" className="item" role="link" tabIndex="1">Home</Link>
        <Links isAuthenticated={ isAuthenticated } />
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

Links.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};