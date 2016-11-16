import axios from 'axios';
import { Map } from 'immutable';

import { ROOT_URL } from '../constants';
import { setHeaders } from '../helpers/utils';

export const UPDATE_REVIEW_BODY = 'UPDATE_REVIEW_BODY';
export const UPDATE_REVIEW_RATING = 'UPDATE_REVIEW_RATING';
export const SUBMISSION_REVIEW_SUCCESS = 'SUBMISSION_REVIEW_SUCCESS';
export const SUBMISSION_EREVIEW_ERROR = 'SUBMISSION_EREVIEW_ERROR';

// Actions
export function updateReviewBody (body) {
  return {
    type: UPDATE_REVIEW_BODY,
    body
  };
}

export function updateReviewRating (rating) {
  return {
    type: UPDATE_REVIEW_RATING,
    rating
  };
}

export function submittedSuccessfully () {
  return {
    type: SUBMISSION_REVIEW_SUCCESS
  };
}

export function submissionError (error) {
  return {
    type: SUBMISSION_EREVIEW_ERROR,
    error
  };
}

const initialState = Map({
  body: '',
  rating: '',
  error: ''
});

// reducer
export default function reviewFormReducer (state = initialState, action) {
  switch (action.type) {

    case UPDATE_REVIEW_BODY:
      return state.merge({
        body: action.body
      });

    case UPDATE_REVIEW_RATING:
      return state.merge({
        rating: action.rating
      });

    case SUBMISSION_REVIEW_SUCCESS:
      return state.merge({
        body: '',
        rating: '',
        error: ''
      });

    case SUBMISSION_EREVIEW_ERROR:
      return state.merge({
        error: action.error
      });

    default:
      return state;
  }
}

// Handlers
export function submitReview (productId, review) {
  // console.log(restaurantId, body, rating);
  return function (dispatch) {
    axios.post(`${ROOT_URL}/api/products/${productId}/reviews`, review, setHeaders())
      .then((res) => {
        // console.log('NEW REVIEW LIST\n', res.data);
        dispatch(submittedSuccessfully());
        return window.location.pathname = `products/${productId}`;
      })
      .catch((err) => {
        let error = 'Review submission failed.';
        if (err.response && err.response.data && err.response.data.error) {
          error = err.response.data.error;
        }
        return dispatch(submissionError(error));
      });
  };
}