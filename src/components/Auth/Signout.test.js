import React from 'react';
import { shallow } from 'enzyme';
import Signout from './Signout';

describe('[Component Signout]', () => {
  it('should display signout component', () => {
    const SignoutComponent
      = <Signout />
    let wrapper = shallow(SignoutComponent);
    expect(wrapper.find('h3').text()).toEqual('You are signed out ... ');
  });
});