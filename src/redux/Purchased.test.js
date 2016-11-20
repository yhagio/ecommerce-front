import { Map } from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock'
import * as Purchased from './Purchased';
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
 * Redux - Purchased - Actions
 ******************************/
describe('[Redux - Purchased] actions', () => {
  it('should create an action when fetching', () => {
    const expectedAction = {
      type: Purchased.FETCHING_PURCHASED_PRODUCT
    };
    expect(Purchased.fetchingProduct()).toEqual(expectedAction);
  });

  it('should create an action when fetched a product', () => {
    const product = { id: 123, naem: 'some name'};
    const expectedAction = {
      type: Purchased.FETCHING_PURCHASED_PRODUCT_SUCCESS,
      product,
    };
    expect(Purchased.fetchingProductSuccess(product)).toEqual(expectedAction);
  });

  it('should create an action when failed to fetch a product', () => {
    const error = 'Not Purcached.';
    const expectedAction = {
      type: Purchased.FETCHING_PURCHASED_PRODUCT_FAILURE,
      error
    };
    expect(Purchased.fetchingProductError(error)).toEqual(expectedAction);
  });
});

/******************************
 * Redux - Purchased - Reducers
 ******************************/
describe('[Redux - Purchased] reducers', () => {
  it('should return the initial state', () => {
    expect(
      Purchased.default(undefined, {})
    ).toEqual(
      Map({
        product: {},
        error: '',
        isFetching: false,
      })
    );
  });

  it('should handle FETCHING_PURCHASED_PRODUCT', () => {
    expect(
      Purchased.default(undefined, {
        type: Purchased.FETCHING_PURCHASED_PRODUCT
      })
    ).toEqual(
      Map({
        product: {},
        error: '',
        isFetching: true,
      })
    );
  });

  it('should handle FETCHING_PURCHASED_PRODUCT_FAILURE', () => {
    const error = 'Not Purcached.';
    expect(
      Purchased.default(undefined, {
        type: Purchased.FETCHING_PURCHASED_PRODUCT_FAILURE,
        error
      })
    ).toEqual(
      Map({
        product: {},
        error,
        isFetching: false,
      })
    );
  });

  it('should handle FETCHING_PURCHASED_PRODUCT_SUCCESS', () => {
    const product = Map({ id: 123, name: 'some name' });
    expect(
      Purchased.default(undefined, {
        type: Purchased.FETCHING_PURCHASED_PRODUCT_SUCCESS,
        product
      })
    ).toEqual(
      Map({
        product,
        error: '',
        isFetching: false,
      })
    );
  });
});

/************************************
 * Redux - Purchased - Action Creators
 ************************************/
describe('[Redux - Purchased] action creators - fetchPurchasedProduct()', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('successfully fetched a purchased product info', () => {
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

    // 3.Fetch the purchased product info
    const product = { id: 1, name: 'Some name' }
    nock(ROOT_URL)
      .get('/api/products/1/purchased')
      .reply(200, {
        data: {
          product
        }
      });

    const expectedActions = [
      { type: Purchased.FETCHING_PURCHASED_PRODUCT },
      { type: Purchased.FETCHING_PURCHASED_PRODUCT_SUCCESS, product }
    ];

    const store = mockStore({ });
    
    return store.dispatch(Purchased.fetchPurchasedProduct(1))
      .then(res => expect(store.getActions()).toEqual(expectedActions))
      .catch(() => {});
  });

  it('failed to fetch a purchased product', () => {
    nock(ROOT_URL)
      .get('/api/products/1/purchased')
      .reply(400);

    const expectedActions = [
      { type: Purchased.FETCHING_PURCHASED_PRODUCT },
      { type: Purchased.FETCHING_PURCHASED_PRODUCT_FAILURE, error: 'Not Purcached.' },
    ];

    const store = mockStore({ });
    
    return store.dispatch(Purchased.fetchPurchasedProduct(1))
      .then()
      .catch(err => expect(store.getActions()).toEqual(expectedActions))
  });
});