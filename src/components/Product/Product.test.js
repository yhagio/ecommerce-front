import React from 'react';
import { Map } from 'immutable';
import { shallow } from 'enzyme';
import Product from './Product';

// Fake localStorage
global.localStorage = { 
  getItem: function(key) {
    return 'Value';
  }
};

describe('[Component Product]', () => {
  it('should display fetching when fetching', () => {
    const ProductComponent
      = <Product
          product={ {} }
          isFetching={ true }
          error=''
          message=''
          addToCart={jest.fn()}
          cartError=''
          submitReview={jest.fn()}
          deleteReview={jest.fn()}
          updateReviewBody={jest.fn()}
          updateReviewRating={jest.fn()}
          reviewFormError=''
          reviewBody=''
          reviewRating='' />
    let wrapper = shallow(ProductComponent);
    expect(wrapper.find('h3').text()).toEqual('Loading ...');
  });

  it('should display message when there is no product (error)', () => {
    const ProductComponent
      = <Product
          product={ {} }
          isFetching={ false }
          error='Error'
          message=''
          addToCart={jest.fn()}
          cartError=''
          submitReview={jest.fn()}
          deleteReview={jest.fn()}
          updateReviewBody={jest.fn()}
          updateReviewRating={jest.fn()}
          reviewFormError=''
          reviewBody=''
          reviewRating='' />
    let wrapper = shallow(ProductComponent);
    expect(wrapper.find('h3').text()).toEqual('No Product Found');
  });

  it('should be able to add product to cart', () => {
    const addToCartFn = jest.fn();
    const ProductComponent
      = <Product
          product={ Map({ id: 1, name: 'JP101', price: 12.5, reviews: [] }) }
          isFetching={ false }
          error=''
          message=''
          addToCart={addToCartFn}
          cartError=''
          submitReview={jest.fn()}
          deleteReview={jest.fn()}
          updateReviewBody={jest.fn()}
          updateReviewRating={jest.fn()}
          reviewFormError=''
          reviewBody=''
          reviewRating='' />
    let wrapper = shallow(ProductComponent);
    wrapper.find('.addButton').simulate('click', { preventDefault() {} });
    expect(addToCartFn).toHaveBeenCalledWith(1);
  });

  it('should display message when tring to add already added product to cart', () => {
    const ProductComponent
      = <Product
          product={ Map({ id: 1, name: 'JP101', price: 12.5, reviews: [] }) }
          isFetching={ false }
          error=''
          message='added!'
          addToCart={jest.fn()}
          cartError=''
          submitReview={jest.fn()}
          deleteReview={jest.fn()}
          updateReviewBody={jest.fn()}
          updateReviewRating={jest.fn()}
          reviewFormError=''
          reviewBody=''
          reviewRating='' />
    let wrapper = shallow(ProductComponent);
    expect(wrapper.find('.addToCartMessage').text()).toEqual('added!');
  });

  it('should display reviews', () => {
    const ProductComponent
      = <Product
          product={ Map({ id: 1, name: 'JP101', price: 12.5, reviews: [
          
          Map({
            id: 1,
            body: 'Hello',
            raing: 5,
            user_id: 1,
            product_id: 1,
            updatedAt: 'some date'
          }) ] }) }
          isFetching={ false }
          error=''
          message=''
          addToCart={jest.fn()}
          cartError=''
          submitReview={jest.fn()}
          deleteReview={jest.fn()}
          updateReviewBody={jest.fn()}
          updateReviewRating={jest.fn()}
          reviewFormError=''
          reviewBody=''
          reviewRating='' />
    let wrapper = shallow(ProductComponent);
    expect(wrapper.find('.reviewList').containsMatchingElement(<p className="reviewBody">Hello</p>)).toEqual(true);
  });

  it('should display cart error if there is one', () => {
    const ProductComponent
      = <Product
          product={ Map({ id: 1, name: 'JP101', price: 12.5, reviews: [] }) }
          isFetching={ false }
          error=''
          message=''
          addToCart={jest.fn()}
          cartError='Error!'
          submitReview={jest.fn()}
          deleteReview={jest.fn()}
          updateReviewBody={jest.fn()}
          updateReviewRating={jest.fn()}
          reviewFormError=''
          reviewBody=''
          reviewRating='' />
    let wrapper = shallow(ProductComponent);
    expect(wrapper.find('.cartError').text()).toEqual('Error!');
  });

  it('should be able to delete own review', () => {
    const deleteReview = jest.fn();
    const ProductComponent
      = <Product
          product={ Map({ authedId: 1, id: 1, name: 'JP101', price: 12.5, reviews: [
          
          Map({
            id: 1,
            body: 'Hello',
            raing: 5,
            user_id: 1,
            product_id: 1,
            updatedAt: 'some date'
          }) ] }) }
          isFetching={ false }
          error=''
          message=''
          addToCart={jest.fn()}
          cartError=''
          submitReview={jest.fn()}
          deleteReview={deleteReview}
          updateReviewBody={jest.fn()}
          updateReviewRating={jest.fn()}
          reviewFormError=''
          reviewBody=''
          reviewRating='' />
    let wrapper = shallow(ProductComponent);
    wrapper.find('.deleteButton').simulate('click', { preventDefault() {} });
    expect(deleteReview).toHaveBeenCalledWith(1);
  });

});
