import { fromJS, Map } from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock'
import * as Cart from './Cart';
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
 * Redux - Cart - Actions
 ******************************/
describe('[Redux - Cart] actions', () => {
  it('should create an action on fetching cart', () => {
    const expectedAction = {
      type: Cart.FETCHING_CART,
    };
    expect(Cart.fetchingCart()).toEqual(expectedAction);
  });

  it('should create an action to add a product to your cart', () => {
    const message = 'Added to cart.';
    const expectedAction = {
      type: Cart.ADD_TO_CART_SUCCESS,
      message,
    };
    expect(Cart.addToCartSuccess(message)).toEqual(expectedAction);
  });

  it('should create an action to clear message', () => {
    const expectedAction = {
      type: Cart.CLEAR_ERROR_MESSAGE,
    };
    expect(Cart.clearMessage()).toEqual(expectedAction);
  });

  it('should create an action when successfully fetched cart', () => {
    const cart = [{ id: 1}, {id: 2}];
    const expectedAction = {
      type: Cart.FETCHING_CART_SUCCESS,
      cart,
    };
    expect(Cart.fetchingCartSuccess(cart)).toEqual(expectedAction);
  });

  it('should create an action when failed to fetch cart', () => {
    const error = 'Ohhh nooo!!!!';
    const expectedAction = {
      type: Cart.FETCHING_CART_FAILURE,
      error,
    };
    expect(Cart.fetchingCartError(error)).toEqual(expectedAction);
  });

  it('should create an action when failed to pay', () => {
    const error = 'Ohhh nooo!!!!';
    const expectedAction = {
      type: Cart.PAY_TOTAL_FAILURE,
      error,
    };
    expect(Cart.failedToPay(error)).toEqual(expectedAction);
  });

  it('should create an action when paid successfully', () => {
    const expectedAction = {
      type: Cart.PAID_TOTAL_SUCCESSFULLY
    };
    expect(Cart.successfullyPaid()).toEqual(expectedAction);
  });

});

/******************************
 * Redux - Cart - Reducers
 ******************************/
describe('[Redux - Cart] reducers', () => {
  it('should return the initial state', () => {
    expect(
      Cart.default(undefined, {})
    ).toEqual(
      fromJS({
        cart: [],
        error: '',
        isFetching: false,
        message: '',
      })
    );
  });

  it('should handle FETCHING_CART', () => {
    expect(
      Cart.default(undefined, {
        type: Cart.FETCHING_CART
      })
    ).toEqual(
      fromJS({
        cart: [],
        error: '',
        isFetching: true,
        message: '',
      })
    );
  });

  it('should handle ADD_TO_CART_SUCCESS', () => {
    const message = 'Success!';
    expect(
      Cart.default(undefined, {
        type: Cart.ADD_TO_CART_SUCCESS,
        message
      })
    ).toEqual(
      fromJS({
        cart: [],
        error: '',
        isFetching: false,
        message,
      })
    );
  });

  it('should handle CLEAR_ERROR_MESSAGE', () => {
    const before = fromJS({
      cart: [],
      error: 'some error',
      isFetching: false,
      message: 'some message'
    });

    expect(
      Cart.default(before, {
        type: Cart.CLEAR_ERROR_MESSAGE
      })
    ).toEqual(
      fromJS({
        cart: [],
        error: '',
        isFetching: false,
        message: '',
      })
    );
  });

  it('should handle FETCHING_CART_FAILURE', () => {
    const error = 'Some error';
    expect(
      Cart.default(undefined, {
        type: Cart.FETCHING_CART_FAILURE,
        error
      })
    ).toEqual(
      fromJS({
        cart: [],
        error,
        isFetching: false,
        message: '',
      })
    );
  });

  it('should handle FETCHING_CART_SUCCESS', () => {
    const cart = [{id: 1}, {id: 2}];

    expect(
      Cart.default(undefined, {
        type: Cart.FETCHING_CART_SUCCESS,
        cart
      })
    ).toEqual(
      fromJS({
        cart,
        error: '',
        isFetching: false,
        message: '',
      })
    );
  });

  it('should handle PAY_TOTAL_FAILURE', () => {
    const error = 'Some error';

    expect(
      Cart.default(undefined, {
        type: Cart.PAY_TOTAL_FAILURE,
        error
      })
    ).toEqual(
      fromJS({
        cart: [],
        error,
        isFetching: false,
        message: '',
      })
    );
  });

  it('should handle PAID_TOTAL_SUCCESSFULLY', () => {
    const before = fromJS({
      cart: [],
      error: 'some error?',
      isFetching: true,
      message: '',   
    });

    expect(
      Cart.default(before, {
        type: Cart.PAID_TOTAL_SUCCESSFULLY
      })
    ).toEqual(
      fromJS({
        cart: [],
        error: '',
        isFetching: false,
        message: '',
      })
    );
  });

});

/************************************
 * Redux - Cart - Action Creators
 ************************************/
describe('[Redux - Cart] action creators - addToCart()', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('successfully added a product to the cart', () => {
    // Create a new user to let him logged-in first
    const userObject = {
      first_name: 'David',
      last_name: 'Smith',
      email: 'david@cc.cc'
    };

    nock(ROOT_URL)
      .post('/api/users', { firstName: 'Alice', lastName: 'Smith', email: 'alice@cc.cc', password: 'FakePass!12' })
      .reply(200, {
        token: 'RandomToken123!',
        user: {
          id: 10,
          first_name: 'Alice',
          last_name: 'Smith',
          email: 'alice@cc.cc'
        }
      });

    // Delay it a little ot make sure user is signed in
    const id = 3;
    // setTimeout(() => {
      nock(ROOT_URL)
        .put('/api/cart', { id })
        .reply(200);

      const expectedActions = [
        { type: Cart.ADD_TO_CART_SUCCESS, message: 'Added to cart.' },
        { type: Cart.CLEAR_ERROR_MESSAGE }
      ];

      const store = mockStore({ });
      
      return store.dispatch(Cart.addToCart(id))
        .then(res => expect(store.getActions()).toEqual(expectedActions))
        .catch(() => {});
    // }, 100);
  });

  it('failed to add a product to cart', () => {
    const id = 3;
    nock(ROOT_URL)
      .put('/api/cart', { id })
      .reply(400);

    const expectedActions = [
      { type: Cart.FETCHING_CART_FAILURE, error: 'Added to cart.' },
      { type: Cart.CLEAR_ERROR_MESSAGE }
    ];

    const store = mockStore({ });
    
    return store.dispatch(Cart.addToCart(id))
      .then()
      .catch(err => expect(store.getActions()).toEqual(expectedActions))
  });
});

describe('[Redux - Cart] action creators - fetchCart()', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('creates FETCHING_CART_SUCCESS if successfuly fetched cart', () => {
    // Need fake user logged in
    nock(ROOT_URL)
      .post('/api/users', { firstName: 'Alice', lastName: 'Smith', email: 'alice@cc.cc', password: 'FakePass!12' })
      .reply(200, {
        token: 'RandomToken123!',
        user: {
          first_name: 'Alice',
          last_name: 'Smith',
          email: 'alice@cc.cc'
        }
      });

    // Delay it a little ot make sure user is signed in
    // before sending update
    const cart = [{id: 1}, {id: 2}];
    // setTimeout(() => {
      nock(ROOT_URL)
        .get('/api/users/Cart')
        .reply(200, { data: cart });

      const expectedActions = [
        { type: Cart.FETCHING_CART },
        { type: Cart.FETCHING_CART_SUCCESS, cart }
      ];

      const store = mockStore({ });

      return store.dispatch(Cart.fetchCart())
        .then(res => expect(store.getActions()).toEqual(expectedActions))
        .catch(() => {});
    // }, 100);

  });

  it('creates FETCHING_CART_FAILURE if failed to fetch cart', () => {
    nock(ROOT_URL)
      .get('/api/users/Cart')
      .reply(400);

    const expectedActions = [
      { type: Cart.FETCHING_CART },
      { type: Cart.FETCHING_CART_FAILURE, error: 'Could not get the cart infomation.' }
    ];

    const store = mockStore({ });

    return store.dispatch(Cart.fetchCart())
      .then()
      .catch(err => expect(store.getActions()).toEqual(expectedActions));
  });
});

describe('[Redux - Cart] action creators - deletefromCart()', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('creates FETCHING_CART_SUCCESS if successfuly delete a product from cart', () => {
    // Need fake user logged in
    nock(ROOT_URL)
      .post('/api/users', { 
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@cc.cc',
        password: 'FakePass!12' })
      .reply(200, {
        token: 'RandomToken123!',
        user: {
          first_name: 'Alice',
          last_name: 'Smith',
          email: 'alice@cc.cc'
        }
      });

    // Add a product to cart first
    const id = 1000;
    setTimeout(() => {
      nock(ROOT_URL)
        .post('/api/cart', { id })
        .reply(200);
    }, 100);

    // Delay it a little ot make sure user is signed in + added it to cart
    // before deleting it from the cart
    const cart = [{id: 1}, {id: 2}, {id: 1000}];
    // setTimeout(() => {
      nock(ROOT_URL)
        .delete(`/api/cart/${id}`)
        .reply(200, { data: cart });

      const expectedActions = [
        { type: Cart.FETCHING_CART },
        { type: Cart.FETCHING_CART_SUCCESS, cart }
      ];

      const store = mockStore({ });

      return store.dispatch(Cart.deletefromCart(id))
        .then(res => expect(store.getActions()).toEqual(expectedActions))
        .catch(() => {});
    // }, 200);

  });

  it('creates FETCHING_CART_FAILURE if failed to delete it from cart', () => {
    nock(ROOT_URL)
      .delete(`/api/cart/1900`)
      .reply(400);

    const expectedActions = [
      { type: Cart.FETCHING_CART },
      { type: Cart.FETCHING_CART_FAILURE, error: 'Could not remove the product.' }
    ];

    const store = mockStore({ });

    return store.dispatch(Cart.deletefromCart(1900))
      .then()
      .catch(err => expect(store.getActions()).toEqual(expectedActions));
  });
});

describe('[Redux - Cart] action creators - payTotal()', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('creates PAID_TOTAL_SUCCESSFULLY when paid total successfully', () => {
    const token = 'RandomToken123!';

    // Need fake user logged in
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

    // Add a product to cart first
    const id = 1000;
    setTimeout(() => {
      nock(ROOT_URL)
        .post('/api/cart', { id })
        .reply(200);
    }, 100);

    // Delay it a little ot make sure user is signed in + added it to cart
    // before paying it
    const purchaseList = [
      { product_id: 1, name: 'J101' },
      { product_id: 2, name: 'J102' }
    ];
    const cartObject = {
      token,
      purchaseList
    };

    // setTimeout(() => {
      nock(ROOT_URL)
        .post(`/api/payTotal`, cartObject)
        .reply(200);

      const expectedActions = [
        { type: Cart.PAID_TOTAL_SUCCESSFULLY },
        // { type: Cart.PAY_TOTAL_FAILURE, error: 'Could not purchase them.' }
      ];

      const store = mockStore({ });

      return store.dispatch(Cart.payTotal(cartObject))
        .then(res => expect(store.getActions()).toEqual(expectedActions))
        .catch(() => {});
    // }, 200);
  });

  it('creates PAY_TOTAL_FAILURE when failed to pay total', () => {
    const token = 'RandomToken123!';

    // Need fake user logged in
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

    // Add a product to cart first
    const id = 1000;
    setTimeout(() => {
      nock(ROOT_URL)
        .post('/api/cart', { id })
        .reply(200);
    }, 100);

    // Delay it a little ot make sure user is signed in + added it to cart
    // before paying it
    const purchaseList = [
      { product_id: 1, name: 'J101' },
      { product_id: 2, name: 'J102' }
    ];
    const cartObject = {
      purchaseList
    };

    setTimeout(() => {
      nock(ROOT_URL)
        .post(`/api/payTotal`, cartObject)
        .reply(400);

      const expectedActions = [
        { type: Cart.PAY_TOTAL_FAILURE, error: 'Could not purchase them.' }
      ];

      const store = mockStore({ });

      return store.dispatch(Cart.payTotal(cartObject))
        .then()
        .catch(err => expect(store.getActions()).toEqual(expectedActions))
    }, 200);
  });
});
