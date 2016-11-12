import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './account.css';

export default function Account (props) {
  return props.isFetching
  ? <h3>Loading ...</h3>
  : Object.keys(props.user).length === 0 || props.error.length > 0
    ? <h3>{ props.error }</h3>
    : <div>
        <h3>Your Account</h3>
        <div>
          <h4>Name: { props.user.get('first_name') + ' ' + props.user.get('last_name')}</h4>
          <p>Email: { props.user.get('email') }</p>
          <p>Phone: { props.user.get('phone') || 'None' }</p>
          <p>Address: { props.user.get('address') || 'None'}</p>
          <p>Profile photo URL: { props.user.get('photo_url') || 'None'}</p>
        </div>
        <Link to="/account/edit" role="link" className="linkButton">Edit Profile</Link>
        <Link to="/account/receipts" role="link" className="linkButton receiptLink">Receipts</Link>
      </div>;
}

Account.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};
