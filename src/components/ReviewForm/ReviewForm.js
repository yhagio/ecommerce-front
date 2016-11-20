import React, { PropTypes } from 'react';
import './reviewForm.css';

export function SubmitButton (props) {
  if (!props.reviewBody || !props.reviewRating) {
    return (
      <button
        action='submit'
        disabled={ "disabled" }
        className='reviewSubmitBtn'
        role='button'>Not ready</button>
    )
  } else {
    return (
      <button
        action='submit'
        className='reviewSubmitBtn readyBtn'
        role='button'>Add Review</button>
    )
  }
}

export default function ReviewForm (props) {
  function handleFormSubmit(e) {
    e.preventDefault();

    return props.submitReview(
      props.productId,
      {
        body: props.reviewBody,
        rating: props.reviewRating
      }
    );
  }

  return (
    <form onSubmit={ handleFormSubmit } className='reviewForm' >
      <label className='labeled'>
        <span className="formTitle">Body</span><br />
        <textarea
          id='reviewBodyText'
          name='reviewBodyText'
          className='reviewTextArea'
          rows="3"
          placeholder='Your Review ...'
          onChange={ (e) => props.updateReviewBody(e.target.value)}
          required={ true } ></textarea>
      </label>

      <label className='labeled'>
        <span className="formTitle">Rating</span><br />
        <select
          id="reviewRatingInput"
          className="reviewSelectRating"
          onChange={ (e) => props.updateReviewRating(e.target.value)}
          required={ true }  >
          <option selected disabled>Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>

      <br />
      <SubmitButton
        reviewBody={ props.reviewBody }
        reviewRating={ props.reviewRating } /><br />

      <p className='formError'>{ props.reviewFormError }</p>
    </form>
  );
}

const { func, string, number } = PropTypes;

ReviewForm.propTypes = {
  submitReview: func.isRequired,
  updateReviewBody: func.isRequired,
  updateReviewRating: func.isRequired,
  reviewFormError: string.isRequired,
  reviewBody: string.isRequired,
  reviewRating: string.isRequired,
  productId: number.isRequired,
}

SubmitButton.propTypes = {
  reviewBody: string.isRequired,
  reviewRating: string.isRequired,
};