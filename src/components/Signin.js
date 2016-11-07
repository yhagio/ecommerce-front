import React, { PropTypes } from 'react';
import './signin.css';

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
        className='formButton signinButton'
        role='button'>Sign in</button>
    )
  }
}

export default function Signin () {
  return (
    <form onSubmit='' className='authForm'>
      <label className='labeled'>Email<br />
        <input
          id='signUpEmail'
          name='signUpEmail'
          className='formInput'
          type='email'
          placeholder='Your Email'
          onChange={ (e) => console.log(e)}
          onBlur={ (e) => console.log(e)}
          required={ true }
          autoFocus={ true } />
      </label>
      <span className=''></span>

      <label className='labeled'>Password<br />
        <input
          id='signUpPassword'
          name='signUpPassword'
          className='formInput'
          type='password'
          placeholder='Your Password'
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

Signin.propTypes = {

};

SubmitButton.propTypes = {

}