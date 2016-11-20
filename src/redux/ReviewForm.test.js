import { Map } from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock'
import * as ReviewForm from './ReviewForm';
import { ROOT_URL } from '../constants';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

// Fake localStorage
global.localStorage = { 
  getItem: function(key) {
    return 'SomeToken';
  }
};

/******************************
 * Redux - ReviewForm - Actions
 ******************************/
describe('[Redux - ReviewForm] actions', () => {
  it('should create an action when updating body', () => {
    const body = 'some body';
    const expectedAction = {
      type: ReviewForm.UPDATE_REVIEW_BODY,
      body
    };
    expect(ReviewForm.updateReviewBody(body)).toEqual(expectedAction);
  });

  it('should create an action when updating rating', () => {
    const rating = '2';
    const expectedAction = {
      type: ReviewForm.UPDATE_REVIEW_RATING,
      rating,
    };
    expect(ReviewForm.updateReviewRating(rating)).toEqual(expectedAction);
  });

  it('should create an action when successfully submitted review', () => {
    const expectedAction = {
      type: ReviewForm.SUBMISSION_REVIEW_SUCCESS,
    };
    expect(ReviewForm.submittedSuccessfully()).toEqual(expectedAction);
  });

  it('should create an action when failed to submit review', () => {
    const error = 'Review submission failed.';
    const expectedAction = {
      type: ReviewForm.SUBMISSION_EREVIEW_ERROR,
      error,
    };
    expect(ReviewForm.submissionError(error)).toEqual(expectedAction);
  });

  it('should create an action when successfully deleted review', () => {
    const expectedAction = {
      type: ReviewForm.DELETION_REVIEW_SUCCESS
    };
    expect(ReviewForm.deletionSuccess()).toEqual(expectedAction);
  });

  it('should create an action when failed to delete review', () => {
    const error = 'Review deletion failed.';
    const expectedAction = {
      type: ReviewForm.DELETION_REVIEW_ERROR,
      error,
    };
    expect(ReviewForm.deletionError(error)).toEqual(expectedAction);
  });
});

/******************************
 * Redux - ReviewForm - Reducers
 ******************************/
describe('[Redux - ReviewForm] reducers', () => {
  it('should return the initial state', () => {
    expect(
      ReviewForm.default(undefined, {})
    ).toEqual(
      Map({
        body: '',
        rating: '',
        error: ''
      })
    );
  });

  it('should handle UPDATE_REVIEW_BODY', () => {
    const body = 'Some body';
    expect(
      ReviewForm.default(undefined, {
        type: ReviewForm.UPDATE_REVIEW_BODY,
        body
      })
    ).toEqual(
      Map({
        body,
        rating: '',
        error: ''
      })
    );
  });

  it('should handle UPDATE_REVIEW_RATING', () => {
    const rating = '5';
    expect(
      ReviewForm.default(undefined, {
        type: ReviewForm.UPDATE_REVIEW_RATING,
        rating
      })
    ).toEqual(
      Map({
        body: '',
        rating,
        error: ''
      })
    );
  });

  it('should handle SUBMISSION_REVIEW_SUCCESS', () => {
    const before = Map({
      body: 'sdfsdfsd',
      rating: '5',
      error: ''
    });

    expect(
      ReviewForm.default(before, {
        type: ReviewForm.SUBMISSION_REVIEW_SUCCESS
      })
    ).toEqual(
      Map({
        body: '',
        rating: '',
        error: ''
      })
    );
  });

  it('should handle SUBMISSION_EREVIEW_ERROR', () => { 
    const error = 'Review submission failed.';   
    expect(
      ReviewForm.default(undefined, {
        type: ReviewForm.SUBMISSION_EREVIEW_ERROR,
        error
      })
    ).toEqual(
      Map({
        body: '',
        rating: '',
        error
      })
    );
  });

  it('should handle DELETION_REVIEW_SUCCESS', () => { 
    expect(
      ReviewForm.default(undefined, {
        type: ReviewForm.DELETION_REVIEW_SUCCESS
      })
    ).toEqual(
      Map({
        body: '',
        rating: '',
        error: ''
      })
    );
  });

  it('should handle DELETION_REVIEW_ERROR', () => { 
    const error = 'Review deletion failed.';   
    expect(
      ReviewForm.default(undefined, {
        type: ReviewForm.DELETION_REVIEW_ERROR,
        error
      })
    ).toEqual(
      Map({
        body: '',
        rating: '',
        error
      })
    );
  });
});

/************************************
 * Redux - ReviewForm - Action Creators
 ************************************/
describe('[Redux - ReviewForm] action creators - submitReview()', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('successfully submit the review', () => {
    // 0.Signup a user
    const token = 'RandomToken123!';
    nock(ROOT_URL)
      .post('/api/users', { 
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@cc.cc',
        password: 'FakePass!12' })
      .reply(200, {
        token,
        user: {
          first_name: 'Alice',
          last_name: 'Smith',
          email: 'alice@cc.cc'
        }
      });

    // 1.Add a product to cart
    const id = 1;
    setTimeout(() => {
      nock(ROOT_URL)
        .post('/api/cart', { id })
        .reply(200);
    }, 100);

    // 2.Purchase the product
    const purchaseList = [
      { product_id: 1, name: 'J101' },
    ];
    const cartObject = {
      token,
      purchaseList
    };
    nock(ROOT_URL)
      .post(`/api/payTotal`, cartObject)
      .reply(200);

    // 3. Add review
    const review = { rating: '5', body: 'Some body' };

    nock(ROOT_URL)
      .post('/api/products/1/reviews')
      .reply(200);

    const expectedActions = [
      { type: ReviewForm.SUBMISSION_REVIEW_SUCCESS },
    ];

    const store = mockStore({ });
    
    return store.dispatch(ReviewForm.submitReview(1, review))
      .then(res => expect(store.getActions()).toEqual(expectedActions))
      .catch(() => {});
  });

  it('failed to submit a review', () => {
    const review = { rating: '5', body: 'Some body' };

    nock(ROOT_URL)
      .post('/api/products/123/reviews', review)
      .reply(400);

    const expectedActions = [
      { type: ReviewForm.SUBMISSION_EREVIEW_ERROR, error: 'Review submission failed.' },
    ];

    const store = mockStore({ });
    
    return store.dispatch(ReviewForm.submitReview(123, review))
      .then()
      .catch(err => expect(store.getActions()).toEqual(expectedActions))
  });
});

describe('[Redux - ReviewForm] action creators - deleteReview()', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('successfully delete a review', () => {
    // 0.Signup a user
    const token = 'RandomToken123!';
    nock(ROOT_URL)
      .post('/api/users', { 
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@cc.cc',
        password: 'FakePass!12' })
      .reply(200, {
        token,
        user: {
          first_name: 'Alice',
          last_name: 'Smith',
          email: 'alice@cc.cc'
        }
      });

    // 1.Add a product to cart
    const id = 1;
    setTimeout(() => {
      nock(ROOT_URL)
        .post('/api/cart', { id })
        .reply(200);
    }, 100);

    // 2.Purchase the product
    const purchaseList = [
      { product_id: 1, name: 'J101' },
    ];
    const cartObject = {
      token,
      purchaseList
    };
    nock(ROOT_URL)
      .post(`/api/payTotal`, cartObject)
      .reply(200);

    // 3. Add review
    const review = { rating: '5', body: 'Some body' };

    nock(ROOT_URL)
      .post('/api/products/1/reviews')
      .reply(200);

    const expectedActions = [
      { type: ReviewForm.SUBMISSION_REVIEW_SUCCESS },
    ];

    const store = mockStore({ });
    
    return store.dispatch(ReviewForm.submitReview(1, review))
      .then(res => expect(store.getActions()).toEqual(expectedActions))
      .catch(() => {});
  });

  it('failed to delete a review', () => {
    nock(ROOT_URL)
      .delete('/api/products/123/reviews')
      .reply(400);

    const expectedActions = [
      { type: ReviewForm.DELETION_REVIEW_ERROR, error: 'Review deletion failed.' },
    ];

    const store = mockStore({ });
    
    return store.dispatch(ReviewForm.deleteReview(123))
      .then()
      .catch(err => expect(store.getActions()).toEqual(expectedActions));
  });
});