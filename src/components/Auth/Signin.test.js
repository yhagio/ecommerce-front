import React from 'react';
import { shallow } from 'enzyme';
import Signin, { SubmitButton } from './Signin';

describe('[Component Signin]', () => {
  it('should display error if there is one', () => {
    const SigninComponent
      = <Signin 
          email=''
          password=''
          updateEmail={jest.fn()}
          validateEmail={jest.fn()}
          updatePassword={jest.fn()}
          validatePassword={jest.fn()}
          signinUser={jest.fn()}
          emailError=''
          passwordError=''
          error='erorr!' />
    let wrapper = shallow(SigninComponent);
    expect(wrapper.find('.formError').text()).toEqual('erorr!'); 
  });

  it('should be able to update email', () => {
    const updateEmail = jest.fn();
    const SigninComponent
      = <Signin 
          email=''
          password=''
          updateEmail={ updateEmail }
          validateEmail={jest.fn()}
          updatePassword={jest.fn()}
          validatePassword={jest.fn()}
          signinUser={jest.fn()}
          emailError=''
          passwordError=''
          error='erorr!' />
    let wrapper = shallow(SigninComponent);
    wrapper.find('#signInEmail').simulate('change', {target: {value: 'bob@cc.cc'}});
    expect(updateEmail).toHaveBeenCalledWith('bob@cc.cc');
  });
  
  it('should be able to validate email', () => {
    const validateEmail = jest.fn();
    const SigninComponent
      = <Signin 
          email=''
          password=''
          updateEmail={jest.fn()}
          validateEmail={validateEmail}
          updatePassword={jest.fn()}
          validatePassword={jest.fn()}
          signinUser={jest.fn()}
          emailError=''
          passwordError=''
          error='erorr!' />
    let wrapper = shallow(SigninComponent);
    wrapper.find('#signInEmail').simulate('blur', {target: {value: 'bob@cc.cc'}});
    expect(validateEmail).toHaveBeenCalledWith('bob@cc.cc');
  });

  it('should be able to update password', () => {
    const updatePass = jest.fn();
    const SigninComponent
      = <Signin 
          email=''
          password=''
          updateEmail={jest.fn()}
          validateEmail={jest.fn()}
          updatePassword={updatePass}
          validatePassword={jest.fn()}
          signinUser={jest.fn()}
          emailError=''
          passwordError=''
          error='erorr!' />
    let wrapper = shallow(SigninComponent);
    wrapper.find('#signInPassword').simulate('change', {target: {value: 'bcc.cc'}});
    expect(updatePass).toHaveBeenCalledWith('bcc.cc');
  });

  it('should be able to validate password', () => {
    const validatePass = jest.fn();
    const SigninComponent
      = <Signin 
          email=''
          password=''
          updateEmail={jest.fn()}
          validateEmail={jest.fn()}
          updatePassword={jest.fn()}
          validatePassword={validatePass}
          signinUser={jest.fn()}
          emailError=''
          passwordError=''
          error='erorr!' />
    let wrapper = shallow(SigninComponent);
    wrapper.find('#signInPassword').simulate('blur', {target: {value: 'bc.cc'}});
    expect(validatePass).toHaveBeenCalledWith('bc.cc');
  });

  it('should be able to trigger signin fn', () => {
    const submit = jest.fn();
    const SigninComponent
      = <Signin 
          email='ali@cc.cc'
          password='Pass123!'
          updateEmail={jest.fn()}
          validateEmail={jest.fn()}
          updatePassword={jest.fn()}
          validatePassword={jest.fn()}
          signinUser={submit}
          emailError=''
          passwordError=''
          error='erorr!' />
    let wrapper = shallow(SigninComponent);
    wrapper.find('form').simulate('submit', { preventDefault() { }});
    expect(submit).toHaveBeenCalledWith({ email: 'ali@cc.cc', password: 'Pass123!'});
  });

});

describe('[Component Signin > SubmitButton]', () => {
  it('should not be able to submit if there is an error', () => {
    const SubmitButtonComponent
      = <SubmitButton 
          passwordError=''
          emailError='Oh damnnnnn' />
    let wrapper = shallow(SubmitButtonComponent);
    expect(wrapper.find('button').text()).toEqual('Not ready');
  });

  it('should be able to submit if there is no error', () => {
    const SubmitButtonComponent
      = <SubmitButton 
          emailError=''
          passwordError='' />
    let wrapper = shallow(SubmitButtonComponent);
    expect(wrapper.find('button').text()).toEqual('Sign in');
  });
});