import React, { PropTypes } from 'react';
import './auth.css';

export function SubmitButton (props) {
  if (props.emailError) {
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
        className='formButton resetButton'
        role='button'>Reset Password</button>
    )
  }
}

export default function ForgotPass (props) {
  function handleFormSubmit(e) {
    e.preventDefault();

    return props.submitEmail({
      email: props.email,
    });
  }

  return (
    <form onSubmit={ handleFormSubmit } className='authForm'>
      <h3>Reset Password</h3>
      <label className='labeled'>
        <span className="labeltitle">Email</span><br />
        <span className='errorMessage'>{ props.emailError }</span>
        <input
          id='yourEmail'
          name='yourEmail'
          className='formInput'
          type='email'
          placeholder='Email ...'
          onChange={ (e) => props.updateEmail(e.target.value)}
          onBlur={ (e) => props.validateEmail(e.target.value) }
          required={ true }
          autoFocus={ true } />
      </label>

      <br />
      <SubmitButton
        emailError={ props.emailError } /><br />

      <p className='formError'>{ props.error }</p>
      <p className=''>{ props.message }</p>
    </form>
  );
}

const { func, string } = PropTypes;

ForgotPass.propTypes = {
  message: string.isRequired,
  error: string.isRequired,
  email: string.isRequired,
  emailError: string.isRequired,
  submitEmail: func.isRequired,
  updateEmail: func.isRequired,  
  validateEmail: func.isRequired,
}

SubmitButton.propTypes = {
  emailError: string.isRequired,
};