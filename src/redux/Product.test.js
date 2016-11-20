import { Map } from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock'
import * as Product from './Product';
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
 * Redux - Product - Actions
 ******************************/
describe('[Redux - Product] actions', () => {
  it('should create an action when fetching', () => {
    const expectedAction = {
      type: Product.FETCHING_PRODUCT
    };
    expect(Product.fetchingProduct()).toEqual(expectedAction);
  });

  it('should create an action when fetched a product', () => {
    const product = { id: 123, naem: 'some name'};
    const expectedAction = {
      type: Product.FETCHING_PRODUCT_SUCCESS,
      product,
    };
    expect(Product.fetchingProductSuccess(product)).toEqual(expectedAction);
  });

  it('should create an action when failed to fetch a product', () => {
    const error = 'Some error';
    const expectedAction = {
      type: Product.FETCHING_PRODUCT_FAILURE,
      error
    };
    expect(Product.fetchingProductError(error)).toEqual(expectedAction);
  });
});

/******************************
 * Redux - Product - Reducers
 ******************************/
describe('[Redux - Product] reducers', () => {
  it('should return the initial state', () => {
    expect(
      Product.default(undefined, {})
    ).toEqual(
      Map({
        product: {},
        error: '',
        isFetching: false
      })
    );
  });

  it('should handle FETCHING_PRODUCT', () => {
    expect(
      Product.default(undefined, {
        type: Product.FETCHING_PRODUCT
      })
    ).toEqual(
      Map({
        product: {},
        error: '',
        isFetching: true
      })
    );
  });

  it('should handle FETCHING_PRODUCT_FAILURE', () => {
    const error = 'Some error!';
    expect(
      Product.default(undefined, {
        type: Product.FETCHING_PRODUCT_FAILURE,
        error
      })
    ).toEqual(
      Map({
        product: {},
        error,
        isFetching: false
      })
    );
  });

  it('should handle FETCHING_PRODUCT_SUCCESS', () => {
    const product = Map({ id: 123, name: 'some name' });
    expect(
      Product.default(undefined, {
        type: Product.FETCHING_PRODUCT_SUCCESS,
        product
      })
    ).toEqual(
      Map({
        product,
        error: '',
        isFetching: false
      })
    );
  });
});

/************************************
 * Redux - Product - Action Creators
 ************************************/
describe('[Redux - Product] action creators - fetchProduct()', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('successfully fetched a product', () => {
    const product = { id: 1, name: 'Some name' }
    nock(ROOT_URL)
      .get('/api/products/1')
      .reply(200, {
        data: {
          product
        }
      });

    const expectedActions = [
      { type: Product.FETCHING_PRODUCT },
      { type: Product.FETCHING_PRODUCT_SUCCESS, product }
    ];

    const store = mockStore({ });
    
    return store.dispatch(Product.fetchProduct(1))
      .then(res => expect(store.getActions()).toEqual(expectedActions))
      .catch(() => {});
  });

  it('failed to fetch a product', () => {
    nock(ROOT_URL)
      .get('/api/products/123')
      .reply(400);

    const expectedActions = [
      { type: Product.FETCHING_PRODUCT },
      { type: Product.FETCHING_PRODUCT_FAILURE, error: 'Could not get the product information.' },
    ];

    const store = mockStore({ });
    
    return store.dispatch(Product.fetchProduct(123))
      .then()
      .catch(err => expect(store.getActions()).toEqual(expectedActions))
  });
});