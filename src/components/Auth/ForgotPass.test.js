import React from 'react';
import { shallow } from 'enzyme';
import ForgotPass, { SubmitButton } from './ForgotPass';

describe('[Component ForgotPass]', () => {
  it('load the correct FogotPass component', () => {
    const ForgotPassComponent
      = <ForgotPass 
          message=''
          error=''
          updateEmail={jest.fn()}
          validateEmail={jest.fn()}
          submitEmail={jest.fn()}
          emailError=''
          email='' />
    let wrapper = shallow(ForgotPassComponent);
    expect(wrapper.find('h3').text()).toEqual('Reset Password'); 
  });

  it('displays error if it has error', () => {
    const ForgotPassComponent
      = <ForgotPass 
          message=''
          error='Error occured!'
          updateEmail={jest.fn()}
          validateEmail={jest.fn()}
          submitEmail={jest.fn()}
          emailError=''
          email='' />
    let wrapper = shallow(ForgotPassComponent);
    expect(wrapper.find('.formError').text()).toEqual('Error occured!'); 
  });

  it('displays emailError if it has one', () => {
    const ForgotPassComponent
      = <ForgotPass 
          message=''
          error=''
          updateEmail={jest.fn()}
          validateEmail={jest.fn()}
          submitEmail={jest.fn()}
          emailError='Erorrrrrrr'
          email='' />
    let wrapper = shallow(ForgotPassComponent);
    expect(wrapper.find('.errorMessage').text()).toEqual('Erorrrrrrr'); 
  });

  it('triggers updateEmail fn on change event', () => {
    const updateEmailFn = jest.fn();
    const ForgotPassComponent
      = <ForgotPass 
          message=''
          error=''
          updateEmail={ updateEmailFn }
          validateEmail={jest.fn()}
          submitEmail={jest.fn()}
          emailError=''
          email='' />
    let wrapper = shallow(ForgotPassComponent);
    wrapper.find('#yourEmail').simulate('change', {target: {value: 'bob@cc.cc'}});
    expect(updateEmailFn).toHaveBeenCalledWith('bob@cc.cc');
  });

  it('triggers validateEmail fn on blur event', () => {
    const validateEmailFn = jest.fn();
    const ForgotPassComponent
      = <ForgotPass 
          message=''
          error=''
          updateEmail={jest.fn()}
          validateEmail={ validateEmailFn }
          submitEmail={jest.fn()}
          emailError=''
          email='' />
    let wrapper = shallow(ForgotPassComponent);
    wrapper.find('#yourEmail').simulate('blur', {target: {value: 'bob@cc.cc'}});
    expect(validateEmailFn).toHaveBeenCalledWith('bob@cc.cc');
  });

  it('display "Not ready" if form has errors', () => {
    const SubmitButtonComponent
      = <SubmitButton 
          emailError='Oh damnnnnn' />
    let wrapper = shallow(SubmitButtonComponent);
    expect(wrapper.find('button').text()).toEqual('Not ready');
  });

  it('display "Reset Password" if form has no error', () => {
    const SubmitButtonComponent
      = <SubmitButton 
          emailError='' />
    let wrapper = shallow(SubmitButtonComponent);
    expect(wrapper.find('button').text()).toEqual('Reset Password');
  });

  it('should be able to submit the form', () => {
    const submitEmailFn = jest.fn();

    const ForgotPassComponent
      = <ForgotPass 
          message=''
          error=''
          updateEmail={jest.fn()}
          validateEmail={jest.fn()}
          submitEmail={ submitEmailFn }
          emailError=''
          email='alice@cc.cc' />
    let wrapper = shallow(ForgotPassComponent);
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(submitEmailFn).toHaveBeenCalledWith({ email: 'alice@cc.cc' });
  });
});
