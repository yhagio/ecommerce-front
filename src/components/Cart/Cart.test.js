import React from 'react';
import { List, Map } from 'immutable';
import { shallow } from 'enzyme';
import Cart from './Cart';

describe('[Component Cart]', () => {
  it('displays loading message if loading', () => {
    const CartComponent
      = <Cart 
          payTotal={jest.fn()}
          deletefromCart={jest.fn()}
          cart={List([])}
          isFetching={ true }
          error='' />
    let wrapper = shallow(CartComponent);
    expect(wrapper.find('h3').text()).toEqual('Loading ...'); 
  });

  it('displays "Your Cart" if loaded the page', () => {
    const CartComponent
      = <Cart 
          payTotal={jest.fn()}
          deletefromCart={jest.fn()}
          cart={List([])}
          isFetching={ false }
          error='' />
    let wrapper = shallow(CartComponent);
    expect(wrapper.find('h3').text()).toEqual('Your Cart'); 
  });

  it('displays a message if cart is empty', () => {
    const CartComponent
      = <Cart 
          payTotal={jest.fn()}
          deletefromCart={jest.fn()}
          cart={List([])}
          isFetching={ false }
          error='' />
    let wrapper = shallow(CartComponent);
    expect(wrapper.find('h4').text()).toEqual('No product in your cart.'); 
  });

  it('displays checkout form if there is an item in the cart', () => {
    const CartComponent
      = <Cart 
          payTotal={jest.fn()}
          deletefromCart={jest.fn()}
          cart={List([Map({ id: 1, name: 'JP101', price: 12.5 })])}
          isFetching={ false }
          error='' />
    let wrapper = shallow(CartComponent);
    expect(wrapper.find('h4').text()).toEqual('Checkout');
  });

  it('should be able to delete an item from the cart', () => {
    const deleteFromCartFn = jest.fn();
    const CartComponent
      = <Cart 
          payTotal={jest.fn()}
          deletefromCart={deleteFromCartFn}
          cart={List([Map({ id: 1, name: 'JP101', price: 12.5 })])}
          isFetching={ false }
          error='' />
    let wrapper = shallow(CartComponent);
    wrapper.find('.remove-button').simulate('click');
    expect(deleteFromCartFn).toHaveBeenCalledWith(1);
  });

  xit('should be able to payTotal', () => {

    const token = 'someToken';
    const purchaselist = [{ product_id: 1, product_name: 'JP101', product_price: 12.5 }];
    const payFn = jest.fn();

    const CartComponent
      = <Cart 
          payTotal={payFn}
          deletefromCart={jest.fn()}
          cart={List([Map({ id: 1, name: 'JP101', price: 12.5 })])}
          isFetching={ false }
          error='' />
    let wrapper = shallow(CartComponent);
    // global.document.getElementById= (key) => wrapper;
    // wrapper.querySelector = (key) => '';

    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(payFn).toHaveBeenCalledWith({ token, purchaselist });
  });
});
