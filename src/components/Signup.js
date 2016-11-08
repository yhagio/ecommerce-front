import React, { PropTypes } from 'react';
import './signup.css';

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
        role='button'>Sign up</button>
    )
  }
}

export default function Signup () {
  return (
    <form onSubmit='' className='authForm'>
      <label className='labeled'>Email<br />
        <input
          id='signUpEmail'
          name='signUpEmail'
          className='formInput'
          type='email'
          placeholder='Email'
          onChange={ (e) => console.log(e)}
          onBlur={ (e) => console.log(e)}
          required={ true }
          autoFocus={ true } />
      </label>
      <span className=''></span>

      <label className='labeled'>First Name<br />
        <input
          id='signUpFirstName'
          name='signUpFirstName'
          className='formInput'
          type='text'
          placeholder='First Name'
          onChange={ (e) => console.log(e)}
          onBlur={ (e) => console.log(e)}
          required={ true } />
      </label>
      <span className=''></span>

      <label className='labeled'>Last Name<br />
        <input
          id='signUpLastName'
          name='signUpLastName'
          className='formInput'
          type='text'
          placeholder='Last Name'
          onChange={ (e) => console.log(e)}
          onBlur={ (e) => console.log(e)}
          required={ true } />
      </label>
      <span className=''></span>

      <label className='labeled'>Password<br />
        <input
          id='signUpPassword'
          name='signUpPassword'
          className='formInput'
          type='password'
          placeholder='Secure Password'
          onChange={ (e) => console.log(e)}
          onBlur={ (e) => console.log(e)}
          required={ true } />
      </label>
      <span className=''></span>

      <br />
      <SubmitButton
        emailError={ '' }
        passwordError={ '' } /><br />

      <span className=''></span>
      <br />

    </form>
  );
}

Signup.propTypes = {

};

SubmitButton.propTypes = {

};