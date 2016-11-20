import { fromJS } from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock'
import * as User from './User';
import { ROOT_URL } from '../constants';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

// Fake localStorage
global.localStorage = { 
  getItem: function(key) {
    return 'SomeToken';
  },
  setItem: function(key, value) {
    return value;
  },
  removeItem: function(key) {
    return undefined;
  }
};

/******************************
 * Redux - User - Actions
 ******************************/
describe('[Redux - User] actions', () => {
  // Updatings
  it('should create an action when authenticating user', () => {
    const user = { id: 123, name: 'Hi' };
    const expectedAction = {
      type: User.AUTH_USER,
      user
    };
    expect(User.authenticateUser(user)).toEqual(expectedAction);
  });

  it('should create an action when authentication error occurs', () => {
    const error = 'er';
    const expectedAction = {
      type: User.AUTH_ERROR,
      error
    };
    expect(User.authenticationError(error)).toEqual(expectedAction);
  });

  it('should create an action when fetching user', () => {
    const expectedAction = {
      type: User.FETCHING_USER,
    };
    expect(User.fetchingUser()).toEqual(expectedAction);
  });

  it('should create an action when fetching user error occurs', () => {
    const expectedAction = {
      type: User.FETCHING_USER_FAILURE,
      error: 'Error fetching user.'
    };
    expect(User.fetchingUserFailure('error')).toEqual(expectedAction);
  });

  it('should create an action when fetching user successfully', () => {
    const user = { id: 1, name: 'ali' };
    const expectedAction = {
      type: User.FETCHING_USER_SUCCESS,
      user,
    };
    expect(User.fetchingUserSuccess(user)).toEqual(expectedAction);
  });

  it('should create an action when unauthing user', () => {
    const expectedAction = {
      type: User.UNAUTH_USER,
    };
    expect(User.unauthUser()).toEqual(expectedAction);
  });
});

/******************************
 * Redux - User - Reducers
 ******************************/
describe('[Redux - User] reducers', () => {
  // Updatings
  it('should return the initial state', () => {
    expect(
      User.default(undefined, {})
    ).toEqual(
      fromJS({
        isFetching: false,
        error: '',
        isAuthenticated: false,
        authedUser: {},
      })
    );
  });

  it('should handle AUTH_USER', () => {
    const authedUser = {
      username: 'Bob Sapp',
      password: '123das',
      email: 'bob@co.jp'
    };

    const state = fromJS({
      isFetching: false,
      error: '',
      isAuthenticated: false,
      authedUser: {}
    });

    expect(
      User.default(state, {
        type: User.AUTH_USER,
        user: authedUser
      })
    ).toEqual(
      fromJS({
        isFetching: false,
        error: '',
        isAuthenticated: true,
        authedUser,
      })
    );
  });

  it('should handle UNAUTH_USER', () => {
    const user = fromJS({
      isFetching: false,
      error: '',
      isAuthenticated: true,
      authedUser: { id: 12, name: 'Allo' },
    });

    expect(
      User.default(user, {
        type: User.UNAUTH_USER
      })
    ).toEqual(
      fromJS({
        isFetching: false,
        error: '',
        isAuthenticated: false,
        authedUser: {},
      })
    );
  });

  it('should handle AUTH_ERROR', () => {
    const error = 'some';
    expect(
      User.default(undefined, {
        type: User.AUTH_ERROR,
        error
      })
    ).toEqual(
      fromJS({
        isFetching: false,
        error,
        isAuthenticated: false,
        authedUser: {},
      })
    );
  });

  it('should handle FETCHING_USER', () => { 
    expect(
      User.default(undefined, {
        type: User.FETCHING_USER
      })
    ).toEqual(
      fromJS({
        isFetching: true,
        error: '',
        isAuthenticated: false,
        authedUser: {},
      })
    );
  });

  it('should handle FETCHING_USER_FAILURE', () => {
    const error = 'Err';
    expect(
      User.default(undefined, {
        type: User.FETCHING_USER_FAILURE,
        error
      })
    ).toEqual(
      fromJS({
        isFetching: false,
        error,
        isAuthenticated: false,
        authedUser: {},
      })
    );
  });

  it('should handle FETCHING_USER_SUCCESS', () => {
    const user = { id: 123, name: 'Sam' };
    expect(
      User.default(undefined, {
        type: User.FETCHING_USER_SUCCESS,
        user
      })
    ).toEqual(
      fromJS({
        isFetching: false,
        error: '',
        isAuthenticated: false,
        authedUser: user,
      })
    );
  });
});

/************************************
 * Redux - User - Action Creators
 ************************************/
describe('[Redux - Cart] action creators - signoutUser()', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('creates UNAUTH_USER when sgnout', () => {
    const expectedAction = [{ type: User.UNAUTH_USER }];

    const store = mockStore(fromJS({
      isFetching: false,
      error: '',
      isAuthenticated: false,
      authedUser: {}
    }));

    return store.dispatch(User.signoutUser(() => {
      expect(store.actions()).toEqual(expectedAction);
    }));
  });
});

describe('[Redux - Cart] action creators - signupUser()', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('successfully signup', () => {
    const firstName = 'Alice';
    const lastName = 'Smith';
    const email = 'alice@cc.cc';
    const password = 'Pass123!';
    const userObj = {
      firstName,
      lastName,
      email,
      password
    };

    nock(ROOT_URL)
      .post('/api/users')
      .reply(200, {
        data: {
          token: 'someToken',
          user: {
            first_name: 'Alice',
            last_name: 'Smith',
            email: 'alice@cc.cc',
          }
        }
      });

    const expectedActions = [
      { type: User.AUTH_USER, user: { firstName: 'Alice', last_name: 'Smith', email: 'alice@cc.cc' } },
      { type: User.FETCHING_USER_SUCCESS, user: { firstName: 'Alice', last_name: 'Smith', email: 'alice@cc.cc' } }
    ];

    const store = mockStore({ });
    
    return store.dispatch(User.signupUser(userObj))
      .then(res => expect(store.getActions()).toEqual(expectedActions))
      .catch(() => {});
  });

  it('failed to signup', () => {
    const userObj = {
      first_name: 'Kevin'
    };

    nock(ROOT_URL)
      .post('/api/users')
      .reply(400);

    const expectedActions = [
      { type: User.AUTH_ERROR, error: 'Internal error occured.' },
    ];

    const store = mockStore({ });
    
    return store.dispatch(User.signupUser(userObj))
      .then()
      .catch(err => expect(store.getActions()).toEqual(expectedActions));
  });
});

describe('[Redux - Cart] action creators - signinUser()', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('successfully signin', () => {
    const firstName = 'Alice';
    const lastName = 'Smith';
    const email = 'alice@cc.cc';
    const password = 'Pass123!';

    nock(ROOT_URL)
      .post('/auth/signin')
      .reply(200, {
        data: {
          token: 'someToken',
          user: {
            first_name: 'Alice',
            last_name: 'Smith',
            email: 'alice@cc.cc',
          }
        }
      });

    const expectedActions = [
      { type: User.AUTH_USER, user: { firstName: 'Alice', last_name: 'Smith', email: 'alice@cc.cc' } },
      { type: User.FETCHING_USER_SUCCESS, user: { firstName: 'Alice', last_name: 'Smith', email: 'alice@cc.cc' } }
    ];

    const store = mockStore({ });
    
    return store.dispatch(User.signinUser({ email, password }))
      .then(res => expect(store.getActions()).toEqual(expectedActions))
      .catch(() => {});
  });

  it('failed to signin', () => {
    const userObj = {
      first_name: 'Kevin'
    };

    nock(ROOT_URL)
      .post('/auth/signin')
      .reply(400);

    const expectedActions = [
      { type: User.AUTH_ERROR, error: 'Internal error occured.' },
    ];

    const store = mockStore({ });
    
    return store.dispatch(User.signinUser(userObj))
      .then()
      .catch(err => expect(store.getActions()).toEqual(expectedActions));
  });
});