import React from 'react';
import { List, Map } from 'immutable';
import { shallow } from 'enzyme';
import Products from './Products';

describe('[Component Products]', () => {
  it('should display fetching when fetching', () => {
    const ProductsComponent
      = <Products
          products={ List([]) }
          isFetching={ true }
          error='' />
    let wrapper = shallow(ProductsComponent);
    expect(wrapper.find('h3').text()).toEqual('Fetching ...');
  });

  it('should display message when there is no products (error)', () => {
    const ProductsComponent
      = <Products
          products={ List([]) }
          isFetching={ false }
          error='' />
    let wrapper = shallow(ProductsComponent);
    expect(wrapper.find('h3').text()).toEqual('No Products Found');
  });

  it('should display product list', () => {
    const ProductsComponent
      = <Products
          products={ List([Map({ id: 1, name: 'JP101', price: 12.5 }), Map({ id: 2, name: 'JP102', price: 12.5 })]) }
          isFetching={ false }
          error='' />
    let wrapper = shallow(ProductsComponent);
    expect(wrapper.find('.productList').containsMatchingElement(<h4 className="productTitle">JP101</h4>)).toEqual(true);
  });
});