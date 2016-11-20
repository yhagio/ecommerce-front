import React from 'react';
import { shallow } from 'enzyme';
import ReviewForm, { SubmitButton } from './ReviewForm';

describe('[Component ReviewForm]', () => {
  it('should update review body', () => {
    const updateReviewBody = jest.fn();
    const ReviewFormComponent
      = <ReviewForm
          submitReview={jest.fn()}
          deleteReview={jest.fn()}
          updateReviewBody={updateReviewBody}
          updateReviewRating={jest.fn()}
          reviewFormError=''
          reviewBody=''
          reviewRating=''
          productId={ 5 } />
    let wrapper = shallow(ReviewFormComponent);
    wrapper.find('#reviewBodyText').simulate('change', {target: {value: 'BBB'}});
    expect(updateReviewBody).toHaveBeenCalledWith('BBB');
  });

  it('should update review rating', () => {
    const updateReviewRating = jest.fn();
    const ReviewFormComponent
      = <ReviewForm
          submitReview={jest.fn()}
          deleteReview={jest.fn()}
          updateReviewBody={jest.fn()}
          updateReviewRating={updateReviewRating}
          reviewFormError=''
          reviewBody=''
          reviewRating=''
          productId={ 5 } />
    let wrapper = shallow(ReviewFormComponent);
    wrapper.find('#reviewRatingInput').simulate('change', {target: {value: '5'}});
    expect(updateReviewRating).toHaveBeenCalledWith('5');
  });

  it('should display review form error', () => {
    const ReviewFormComponent
      = <ReviewForm
          submitReview={jest.fn()}
          deleteReview={jest.fn()}
          updateReviewBody={jest.fn()}
          updateReviewRating={jest.fn()}
          reviewFormError='Errrrr'
          reviewBody=''
          reviewRating=''
          productId={ 5 } />
    let wrapper = shallow(ReviewFormComponent);
    expect(wrapper.find('.formError').text()).toEqual('Errrrr');
  });

  it('should be able to submit review form', () => {
    const submit = jest.fn();
    const ReviewFormComponent
      = <ReviewForm
          submitReview={submit}
          deleteReview={jest.fn()}
          updateReviewBody={jest.fn()}
          updateReviewRating={jest.fn()}
          reviewFormError=''
          reviewBody='Hello'
          reviewRating='5'
          productId={ 5 } />
    let wrapper = shallow(ReviewFormComponent);
    wrapper.find('form').simulate('submit', { preventDefault(){ }});
    expect(submit).toHaveBeenCalledWith(5, { body: 'Hello', rating: '5' });
  });
});

describe('[Component ReviewForm > SubmitButton]', () => {
  it('should not be able to submit if there is missing field', () => {
    const SubmitButtonComponent
      = <SubmitButton 
          reviewBody=''
          reviewRating='' />
    let wrapper = shallow(SubmitButtonComponent);
    expect(wrapper.find('button').text()).toEqual('Not ready');
  });

  it('should be able to submit if there is no error', () => {
    const SubmitButtonComponent
      = <SubmitButton 
          reviewRating='2'
          reviewBody='Hello' />
    let wrapper = shallow(SubmitButtonComponent);
    expect(wrapper.find('button').text()).toEqual('Add Review');
  });
});