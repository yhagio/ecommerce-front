import { fromJS } from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock'
import * as Products from './Products';
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
 * Redux - Products - Actions
 ******************************/
describe('[Redux - Products] actions', () => {
  it('should create an action when fetching', () => {
    const expectedAction = {
      type: Products.FETCHING_PRODUCTS
    };
    expect(Products.fetchingProducts()).toEqual(expectedAction);
  });

  it('should create an action when fetched products', () => {
    const products = [{ id: 123, naem: 'some name'}];
    const expectedAction = {
      type: Products.FETCHING_PRODUCTS_SUCCESS,
      products,
    };
    expect(Products.fetchingProductsSuccess(products)).toEqual(expectedAction);
  });

  it('should create an action when failed to fetch products', () => {
    const error = 'Could not get the product list.';
    const expectedAction = {
      type: Products.FETCHING_PRODUCTS_FAILURE,
      error
    };
    expect(Products.fetchingProductsError(error)).toEqual(expectedAction);
  });
});

/******************************
 * Redux - Products - Reducers
 ******************************/
describe('[Redux - Products] reducers', () => {
  it('should return the initial state', () => {
    expect(
      Products.default(undefined, {})
    ).toEqual(
      fromJS({
        products: [],
        error: '',
        isFetching: false
      })
    );
  });

  it('should handle FETCHING_PRODUCTS', () => {
    expect(
      Products.default(undefined, {
        type: Products.FETCHING_PRODUCTS
      })
    ).toEqual(
      fromJS({
        products: [],
        error: '',
        isFetching: true
      })
    );
  });

  it('should handle FETCHING_PRODUCTS_FAILURE', () => {
    const error = 'Could not get the product list.';
    expect(
      Products.default(undefined, {
        type: Products.FETCHING_PRODUCTS_FAILURE,
        error
      })
    ).toEqual(
      fromJS({
        products: [],
        error,
        isFetching: false
      })
    );
  });

  it('should handle FETCHING_PRODUCTS_SUCCESS', () => {
    const products = fromJS([{ id: 123, name: 'some name' }]);
    expect(
      Products.default(undefined, {
        type: Products.FETCHING_PRODUCTS_SUCCESS,
        products
      })
    ).toEqual(
      fromJS({
        products,
        error: '',
        isFetching: false
      })
    );
  });
});

/************************************
 * Redux - Products - Action Creators
 ************************************/
describe('[Redux - Products] action creators - fetchProducts()', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('successfully fetched a products', () => {
    const products = [{ id: 1, name: 'Some name' }]
    nock(ROOT_URL)
      .get('/api/productss/1')
      .reply(200, {
        data: {
          products
        }
      });

    const expectedActions = [
      { type: Products.FETCHING_PRODUCTS },
      { type: Products.FETCHING_PRODUCTS_SUCCESS, products }
    ];

    const store = mockStore({ });
    
    return store.dispatch(Products.fetchProducts(1))
      .then(res => expect(store.getActions()).toEqual(expectedActions))
      .catch(() => {});
  });

  it('failed to fetch products', () => {
    nock(ROOT_URL)
      .get('/api/productss/123')
      .reply(400);

    const expectedActions = [
      { type: Products.FETCHING_PRODUCTS },
      { type: Products.FETCHING_PRODUCTS_FAILURE, error: 'Could not get the product list.' },
    ];

    const store = mockStore({ });
    
    return store.dispatch(Products.fetchProducts(123))
      .then()
      .catch(err => expect(store.getActions()).toEqual(expectedActions))
  });
});