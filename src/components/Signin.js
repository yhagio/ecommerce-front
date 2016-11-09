import React, { PropTypes } from 'react';

export function SubmitButton (props) {
  if (
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
        role='button'>Sign in</button>
    )
  }
}

export default function Signin (props) {
  function handleFormSubmit(e) {
    e.preventDefault();

    return props.signinUser({
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
          id='signInEmail'
          name='signInEmail'
          className='formInput'
          type='email'
          placeholder='Email ...'
          onChange={ (e) => props.updateEmail(e.target.value)}
          onBlur={ (e) => props.validateEmail(e.target.value) }
          required={ true }
          autoFocus={ true } />
      </label>

      <label className='labeled'>
        <span className="labeltitle">Password</span><br />
        <span className='errorMessage'>{ props.passwordError }</span>
        <input
          id='signInPassword'
          name='signInPassword'
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
        passwordError={ props.passwordError } /><br />

      <p className='formError'>{ props.error }</p>

    </form>
  );
}

const { func, string } = PropTypes;

Signin.propTypes = {
  signinUser: func.isRequired,
  error: string.isRequired,

  email: string.isRequired,
  password: string.isRequired,

  emailError: string.isRequired,
  passwordError: string.isRequired,

  updateEmail: func.isRequired,
  updatePassword: func.isRequired,
  
  validateEmail: func.isRequired,
  validatePassword: func.isRequired,
}

SubmitButton.propTypes = {
  emailError: string.isRequired,
  passwordError: string.isRequired,
};