import React from 'react';
import { shallow } from 'enzyme';
import Navigation, { Links } from './Navigation';

describe('[Component Navigation]', () => {
  it('should display navigation', () => {
    const NavigationComponent
      = <Navigation isAuthenticated={true} />
    let wrapper = shallow(NavigationComponent);
    expect(wrapper.find('.item').at(0).prop('to')).toEqual('/');
  });
});

describe('[Component Links]', () => {
  it('should display signup link if not authenticated', () => {
    const LinksComponent
      = <Links isAuthenticated={false} />
    let wrapper = shallow(LinksComponent);
    expect(wrapper.find('.item').at(1).prop('to')).toEqual('/signup');
  });

  it('should display account link if authenticated', () => {
    const LinksComponent
      = <Links isAuthenticated={true} />
    let wrapper = shallow(LinksComponent);
    expect(wrapper.find('.item').at(1).prop('to')).toEqual('/account');
  });
});