import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './account.css';

export function SubmitButton (props) {
  if (
    props.emailError ||
    props.firstNameError ||
    props.lastNameError
  ) {
    return (
      <button
        action='submit'
        disabled={ "disabled" }
        className='linkButton disabledButton'
        role='button'>Not ready</button>
    )
  } else {
    return (
      <button
        action='submit'
        className='linkButton'
        role='button'>Update Profile</button>
    )
  }
}

export default function Account (props) {
  function handleSubmit(e) {
    e.preventDefault();
    
    return props.updateUser({
      email: props.email,
      first_name: props.firstName,
      last_name: props.lastName
    });
  }

  return props.isFetching
  ? <h3>Loading ...</h3>
  : Object.keys(props.user).length === 0 || props.error.length > 0
    ? <h3>{ props.error }</h3>
    : <div className="accountContainer">
        <h3>Your Account</h3>
        
        <form onSubmit={ handleSubmit } className='editForm'>
          <label className='formLabel'>
            <span className="labeltitle">Email</span><br />
            <span className='errorMessage'>{ props.emailError }</span>
            <input
              id='updateEmail'
              name='updateEmail'
              className='formInput'
              type='email'
              placeholder='Email ...'
              defaultValue={ props.user.get('email') }
              onChange={ (e) => props.updateEmail(e.target.value)}
              onBlur={ (e) => props.validateEmail(e.target.value) }
              required={ true } />
          </label>

          <label className='formLabel'>
            <span className="labeltitle">First Name</span><br />
            <span className='errorMessage'>{ props.firstNameError }</span>
            <input
              id='updateFirstName'
              name='updateFirstName'
              className='formInput'
              type='text'
              placeholder='First Name ...'
              defaultValue={ props.user.get('first_name') }
              onChange={ (e) => props.updateFirstName(e.target.value)}
              onBlur={ (e) => props.validateFirstName(e.target.value) }
              required={ true } />
          </label>

          <label className='formLabel'>
            <span className="labeltitle">Last Name</span><br />
            <span className='errorMessage'>{ props.lastNameError }</span>
            <input
              id='updateLastName'
              name='updateLastName'
              className='formInput'
              type='text'
              placeholder='Last Name ...'
              defaultValue={ props.user.get('last_name') }
              onChange={ (e) => props.updateLastName(e.target.value)}
              onBlur={ (e) => props.validateLastName(e.target.value) }
              required={ true } />
          </label>
          <p className="updateMessage">{ props.message }</p>

          <br />
          <SubmitButton
            emailError={ props.emailError }
            lastNameError={ props.lastNameError }
            firstNameError={ props.firstNameError } />
        </form>

        <br />
        <Link to="/account/receipts" role="link" className="receiptLink">See Receipts</Link>
      </div>;
}

Account.propTypes = {
  updateUser: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  updateFirstName: PropTypes.func.isRequired,
  updateLastName: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  validateEmail: PropTypes.func.isRequired,
  validateFirstName: PropTypes.func.isRequired,
  validateLastName: PropTypes.func.isRequired,
  firstNameError: PropTypes.string.isRequired,
  lastNameError: PropTypes.string.isRequired,
  emailError: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};
