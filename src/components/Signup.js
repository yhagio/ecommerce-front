import React, { PropTypes } from 'react';
import './signup.css';

export function SubmitButton (props) {
  if (
    props.firstNameError ||
    props.lastNameError ||
    props.emailError ||
    props.passwordError
  ) {
    return (
      <button
        action='submit'
        disabled={ "disabled" }
        className='formButton'
        role='button'>Not ready</button>
    )
  } else {
    return (
      <button
        action='submit'
        className='formButton signupButton'
        role='button'>Sign up</button>
    )
  }
}

export default function Signup (props) {
  function handleFormSubmit(e) {
    e.preventDefault();

    return props.signupUser({
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
      password: props.password
    });
  }

  return (
    <form onSubmit={ handleFormSubmit } className='authForm'>
      <label className='labeled'>
        <span className="labeltitle">Email</span><br />
        <span className='errorMessage'>{ props.emailError }</span>
        <input
          id='signUpEmail'
          name='signUpEmail'
          className='formInput'
          type='email'
          placeholder='Email ...'
          onChange={ (e) => props.updateEmail(e.target.value)}
          onBlur={ (e) => props.validateEmail(e.target.value) }
          required={ true }
          autoFocus={ true } />
      </label>

      <label className='labeled'>
        <span className="labeltitle">First Name</span><br />
        <span className='errorMessage'>{ props.firstNameError }</span>
        <input
          id='signUpFirstName'
          name='signUpFirstName'
          className='formInput'
          type='text'
          placeholder='First Name ...'
          onChange={ (e) => props.updateFirstName(e.target.value)}
          onBlur={ (e) => props.validateFirstName(e.target.value) }
          required={ true } />
      </label>

      <label className='labeled'>
        <span className="labeltitle">Last Name</span><br />
        <span className='errorMessage'>{ props.lastNameError }</span>
        <input
          id='signUpLastName'
          name='signUpLastName'
          className='formInput'
          type='text'
          placeholder='Last Name ...'
          onChange={ (e) => props.updateLastName(e.target.value)}
          onBlur={ (e) => props.validateLastName(e.target.value) }
          required={ true } />
      </label>

      <label className='labeled'>
        <span className="labeltitle">Password</span><br />
        <span className='errorMessage'>{ props.passwordError }</span>
        <input
          id='signUpPassword'
          name='signUpPassword'
          className='formInput'
          type='password'
          placeholder='Secure Password ...'
          onChange={ (e) => props.updatePassword(e.target.value)}
          onBlur={ (e) => props.validatePassword(e.target.value) }
          required={ true } />
      </label>

      <br />
      <SubmitButton
        emailError={ props.emailError }
        passwordError={ props.passwordError }
        firstNameError={ props.firstNameError }
        lastNameError={ props.lastNameError } /><br />

      <p className='formError'>{ props.error }</p>

    </form>
  );
}

const { func, string } = PropTypes;

Signup.propTypes = {
  signupUser: func.isRequired,
  error: string.isRequired,

  firstName: string.isRequired,
  lastName: string.isRequired,
  email: string.isRequired,
  password: string.isRequired,

  firstNameError: string.isRequired,
  lastNameError: string.isRequired,
  emailError: string.isRequired,
  passwordError: string.isRequired,

  // warnFirstNameError: func.isRequired,
  // warnLastNameError: func.isRequired,
  // warnEmailError: func.isRequired,
  // warnPasswordError: func.isRequired,

  updateEmail: func.isRequired,
  updateFirstName: func.isRequired,
  updateLastName: func.isRequired,
  updatePassword: func.isRequired,
  
  validateEmail: func.isRequired,
  validateFirstName: func.isRequired,
  validateLastName: func.isRequired,
  validatePassword: func.isRequired,
}

SubmitButton.propTypes = {
  firstNameError: string.isRequired,
  lastNameError: string.isRequired,
  emailError: string.isRequired,
  passwordError: string.isRequired,
};