import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function Navigation () {
  return (
    <nav>
      <div className="navBar">
        <Link to="/" className="item" role="link" tabIndex="1">Home</Link>
        <Link to="/search" className="item" role="link" tabIndex="2">Search</Link>
        <Link to="/category" className="item" role="link" tabIndex="3">Category</Link>
  
        <Link to="/signin" className="item right" tabIndex="8" role="link">Sign in</Link>
        <Link to="/signup" className="item right" tabIndex="7" role="link">Sign up</Link>
        <Link to="/signout" className="item right" tabIndex="6" role="link">Sign out</Link>
        <Link to="/account" className="item right" tabIndex="5" role="link">Account</Link>
        <Link to="/cart" className="item right" tabIndex="4" role="link">Cart</Link>
      </div>
    </nav>
  );
}

Navigation.propTypes = {

}