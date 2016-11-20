import React from 'react';
import { shallow } from 'enzyme';
import Signup, { SubmitButton } from './Signup';

describe('[Component Signup]', () => {
  it('should display error if there is one', () => {
    const SignupComponent
      = <Signup
          firstName=''
          lastName=''
          email=''
          password=''
          updateEmail={jest.fn()}
          validateEmail={jest.fn()}
          updateFirstName={jest.fn()}
          validateFirstName={jest.fn()}
          updateLastName={jest.fn()}
          validateLastName={jest.fn()}
          updatePassword={jest.fn()}
          validatePassword={jest.fn()}
          signupUser={jest.fn()}
          firstNameError=''
          lastNameError=''
          emailError=''
          passwordError=''
          error='erorr!' />
    let wrapper = shallow(SignupComponent);
    expect(wrapper.find('.formError').text()).toEqual('erorr!'); 
  });

  it('should be able to update email', () => {
    const updateEmail = jest.fn();
    const SignupComponent
      = <Signup 
          firstName=''
          lastName=''
          email=''
          password=''
          updateEmail={updateEmail}
          validateEmail={jest.fn()}
          updateFirstName={jest.fn()}
          validateFirstName={jest.fn()}
          updateLastName={jest.fn()}
          validateLastName={jest.fn()}
          updatePassword={jest.fn()}
          validatePassword={jest.fn()}
          signupUser={jest.fn()}
          firstNameError=''
          lastNameError=''
          emailError=''
          passwordError=''
          error='' />
    let wrapper = shallow(SignupComponent);
    wrapper.find('#signUpEmail').simulate('change', {target: {value: 'bob@cc.cc'}});
    expect(updateEmail).toHaveBeenCalledWith('bob@cc.cc');
  });
  
  it('should be able to validate email', () => {
    const validateEmail = jest.fn();
    const SignupComponent
      = <Signup 
          firstName=''
          lastName=''
          email=''
          password=''
          updateEmail={jest.fn()}
          validateEmail={validateEmail}
          updateFirstName={jest.fn()}
          validateFirstName={jest.fn()}
          updateLastName={jest.fn()}
          validateLastName={jest.fn()}
          updatePassword={jest.fn()}
          validatePassword={jest.fn()}
          signupUser={jest.fn()}
          firstNameError=''
          lastNameError=''
          emailError=''
          passwordError=''
          error='' />
    let wrapper = shallow(SignupComponent);
    wrapper.find('#signUpEmail').simulate('blur', {target: {value: 'bob@cc.cc'}});
    expect(validateEmail).toHaveBeenCalledWith('bob@cc.cc');
  });

  it('should be able to update first name', () => {
    const updateFN = jest.fn();
    const SignupComponent
      = <Signup 
          firstName=''
          lastName=''
          email=''
          password=''
          updateEmail={jest.fn()}
          validateEmail={jest.fn()}
          updateFirstName={updateFN}
          validateFirstName={jest.fn()}
          updateLastName={jest.fn()}
          validateLastName={jest.fn()}
          updatePassword={jest.fn()}
          validatePassword={jest.fn()}
          signupUser={jest.fn()}
          firstNameError=''
          lastNameError=''
          emailError=''
          passwordError=''
          error='' />
    let wrapper = shallow(SignupComponent);
    wrapper.find('#signUpFirstName').simulate('change', {target: {value: 'BBB'}});
    expect(updateFN).toHaveBeenCalledWith('BBB');
  });

  it('should be able to validate first name', () => {
    const validateFN = jest.fn();
    const SignupComponent
      = <Signup 
          firstName=''
          lastName=''
          email=''
          password=''
          updateEmail={jest.fn()}
          validateEmail={jest.fn()}
          updateFirstName={jest.fn()}
          validateFirstName={validateFN}
          updateLastName={jest.fn()}
          validateLastName={jest.fn()}
          updatePassword={jest.fn()}
          validatePassword={jest.fn()}
          signupUser={jest.fn()}
          firstNameError=''
          lastNameError=''
          emailError=''
          passwordError=''
          error='' />
    let wrapper = shallow(SignupComponent);
    wrapper.find('#signUpFirstName').simulate('blur', {target: {value: 'BBB'}});
    expect(validateFN).toHaveBeenCalledWith('BBB');
  });

  it('should be able to update last name', () => {
    const updateLN = jest.fn();
    const SignupComponent
      = <Signup 
          firstName=''
          lastName=''
          email=''
          password=''
          updateEmail={jest.fn()}
          validateEmail={jest.fn()}
          updateFirstName={jest.fn()}
          validateFirstName={jest.fn()}
          updateLastName={updateLN}
          validateLastName={jest.fn()}
          updatePassword={jest.fn()}
          validatePassword={jest.fn()}
          signupUser={jest.fn()}
          firstNameError=''
          lastNameError=''
          emailError=''
          passwordError=''
          error='' />
    let wrapper = shallow(SignupComponent);
    wrapper.find('#signUpLastName').simulate('change', {target: {value: 'BBB'}});
    expect(updateLN).toHaveBeenCalledWith('BBB');
  });

  it('should be able to validate last name', () => {
    const validateLN = jest.fn();
    const SignupComponent
      = <Signup 
          firstName=''
          lastName=''
          email=''
          password=''
          updateEmail={jest.fn()}
          validateEmail={jest.fn()}
          updateFirstName={jest.fn()}
          validateFirstName={jest.fn()}
          updateLastName={jest.fn()}
          validateLastName={validateLN}
          updatePassword={jest.fn()}
          validatePassword={jest.fn()}
          signupUser={jest.fn()}
          firstNameError=''
          lastNameError=''
          emailError=''
          passwordError=''
          error='' />
    let wrapper = shallow(SignupComponent);
    wrapper.find('#signUpLastName').simulate('blur', {target: {value: 'BBB'}});
    expect(validateLN).toHaveBeenCalledWith('BBB');
  });

  it('should be able to update password', () => {
    const updatePass = jest.fn();
    const SignupComponent
      = <Signup 
          firstName=''
          lastName=''
          email=''
          password=''
          updateEmail={jest.fn()}
          validateEmail={jest.fn()}
          updateFirstName={jest.fn()}
          validateFirstName={jest.fn()}
          updateLastName={jest.fn()}
          validateLastName={jest.fn()}
          updatePassword={updatePass}
          validatePassword={jest.fn()}
          signupUser={jest.fn()}
          firstNameError=''
          lastNameError=''
          emailError=''
          passwordError=''
          error='' />
    let wrapper = shallow(SignupComponent);
    wrapper.find('#signUpPassword').simulate('change', {target: {value: 'bcc.cc'}});
    expect(updatePass).toHaveBeenCalledWith('bcc.cc');
  });

  it('should be able to validate password', () => {
    const validatePass = jest.fn();
    const SignupComponent
      = <Signup 
          firstName=''
          lastName=''
          email=''
          password=''
          updateEmail={jest.fn()}
          validateEmail={jest.fn()}
          updateFirstName={jest.fn()}
          validateFirstName={jest.fn()}
          updateLastName={jest.fn()}
          validateLastName={jest.fn()}
          updatePassword={jest.fn()}
          validatePassword={validatePass}
          signupUser={jest.fn()}
          firstNameError=''
          lastNameError=''
          emailError=''
          passwordError=''
          error='' />
    let wrapper = shallow(SignupComponent);
    wrapper.find('#signUpPassword').simulate('blur', {target: {value: 'bc.cc'}});
    expect(validatePass).toHaveBeenCalledWith('bc.cc');
  });

  it('should be able to trigger Signup fn', () => {
    const submit = jest.fn();
    const SignupComponent
      = <Signup 
          firstName='Ali'
          lastName='Ce'
          email='ali@cc.cc'
          password='Pass123!'
          updateEmail={jest.fn()}
          validateEmail={jest.fn()}
          updateFirstName={jest.fn()}
          validateFirstName={jest.fn()}
          updateLastName={jest.fn()}
          validateLastName={jest.fn()}
          updatePassword={jest.fn()}
          validatePassword={jest.fn()}
          signupUser={submit}
          firstNameError=''
          lastNameError=''
          emailError=''
          passwordError=''
          error='' />
    let wrapper = shallow(SignupComponent);
    wrapper.find('form').simulate('submit', { preventDefault() { }});
    expect(submit).toHaveBeenCalledWith({ email: 'ali@cc.cc', firstName: 'Ali', lastName: 'Ce', password: 'Pass123!'});
  });

});

describe('[Component Signup > SubmitButton]', () => {
  it('should not be able to submit if there is an error', () => {
    const SubmitButtonComponent
      = <SubmitButton 
          firstNameError=''
          lastNameError=''
          passwordError=''
          emailError='Oh damnnnnn' />
    let wrapper = shallow(SubmitButtonComponent);
    expect(wrapper.find('button').text()).toEqual('Not ready');
  });

  it('should be able to submit if there is no error', () => {
    const SubmitButtonComponent
      = <SubmitButton 
          firstNameError=''
          lastNameError=''
          emailError=''
          passwordError='' />
    let wrapper = shallow(SubmitButtonComponent);
    expect(wrapper.find('button').text()).toEqual('Sign up');
  });
});