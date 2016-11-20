import React from 'react';
import { Map } from 'immutable';
import { shallow } from 'enzyme';
import Purchased from './Purchased';

describe('[Component Purchased]', () => {
  it('should display fetching', () => {
    const PurchasedComponent
      = <Purchased 
          product={ {} }
          isFetching={true}
          error='' />
    let wrapper = shallow(PurchasedComponent);
    expect(wrapper.find('h3').text()).toEqual('Loading ...');
  });

  it('should display no product message', () => {
    const PurchasedComponent
      = <Purchased 
          product={ {} }
          isFetching={false}
          error='' />
    let wrapper = shallow(PurchasedComponent);
    expect(wrapper.find('p').text()).toEqual('No Product available');
  });

  it('should display product info', () => {
    const PurchasedComponent
      = <Purchased 
          product={ Map({ id: 1, product_id: 1, description: 'JP101'}) }
          isFetching={false}
          error='' />
    let wrapper = shallow(PurchasedComponent);
    expect(wrapper.find('h3').text()).toEqual('You purchased : JP101');
  });
});