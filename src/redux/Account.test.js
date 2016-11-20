import { Map } from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock'
import * as Account from './Account';
import { ROOT_URL } from '../constants';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

// Fake localStorage
global.localStorage = { 
  getItem: function(key) {
    return 'Value';
  }
};

/******************************
 * Redux - Account - Actions
 ******************************/
describe('[Redux - Account] actions', () => {
  it('should create an action to update first name', () => {
    const firstName = 'Alicia';
    const expectedAction = {
      type: Account.UPDATE_ACCOUNT_FIRST_NAME,
      firstName,
    };
    expect(Account.updateFirstName(firstName)).toEqual(expectedAction);
  });

  it('should create an action to update last name', () => {
    const lastName = 'Vikander';
    const expectedAction = {
      type: Account.UPDATE_ACCOUNT_LAST_NAME,
      lastName,
    };
    expect(Account.updateLastName(lastName)).toEqual(expectedAction);
  });

  it('should create an action to update email', () => {
    const email = 'alice.vikander@node.js';
    const expectedAction = {
      type: Account.UPDATE_ACCOUNT_EMAIL,
      email,
    };
    expect(Account.updateEmail(email)).toEqual(expectedAction);
  });

  it('should create an action to raise first name error', () => {
    const firstNameError = 'Ohhh nooo!';
    const expectedAction = {
      type: Account.ACCOUNT_FIRST_NAME_ERROR,
      firstNameError,
    };
    expect(Account.warnFirstNameError(firstNameError)).toEqual(expectedAction);
  });

  it('should create an action to raise last name error', () => {
    const lastNameError = 'Ohhh nooo!!!!';
    const expectedAction = {
      type: Account.ACCOUNT_LAST_NAME_ERROR,
      lastNameError,
    };
    expect(Account.warnLastNameError(lastNameError)).toEqual(expectedAction);
  });

  it('should create an action to raise email error', () => {
    const emailError = 'Ohhh nooo!!!!';
    const expectedAction = {
      type: Account.ACCOUNT_EMAIL_ERROR,
      emailError,
    };
    expect(Account.warnEmailError(emailError)).toEqual(expectedAction);
  });

  it('should create an action to notify update message', () => {
    const message = 'Updated!';
    const expectedAction = {
      type: Account.UPDATED_MESSAGE,
      message
    };
    expect(Account.notifyUpdateSuccess()).toEqual(expectedAction);
  });

  it('should create an action to clear message', () => {
    const expectedAction = {
      type: Account.CLEAR_UPDATED_MESSAGE,
    };
    expect(Account.clearUpdateSuccess()).toEqual(expectedAction);
  });

  it('should create an action to fetch user', () => {
    const expectedAction = {
      type: Account.FETCHING_ACCOUNT_USER,
    };
    expect(Account.fetchingUser()).toEqual(expectedAction);
  });

  it('should create an action when fetched user successfully', () => {
    const user = { name: 'Alice' };
    const expectedAction = {
      type: Account.FETCHING_ACCOUNT_USER_SUCCESS,
      user
    };
    expect(Account.fetchingUserSuccess(user)).toEqual(expectedAction);
  });
  
  it('should create an action when failed to fetch user', () => {
    const error = 'Ughh where is user?';
    const expectedAction = {
      type: Account.FETCHING_ACCOUNT_USER_FAILURE,
      error
    };
    expect(Account.fetchingUserError(error)).toEqual(expectedAction);
  });
});

/******************************
 * Redux - Account - Reducers
 ******************************/
describe('[Redux - Account] reducers', () => {
  it('should return the initial state', () => {
    expect(
      Account.default(undefined, {})
    ).toEqual(
      Map({
        user: {},
        error: '',
        isFetching: false,
        firstName: '',
        lastName: '',
        email: '',
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        message: ''
      })
    );
  });

  it('should update first name', () => {
    const firstName = 'Alicia';
    expect(
      Account.default(undefined, {
        type: Account.UPDATE_ACCOUNT_FIRST_NAME,
        firstName
      })
    ).toEqual(
      Map({
        user: {},
        error: '',
        isFetching: false,
        firstName,
        lastName: '',
        email: '',
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        message: ''
      })
    );
  });

  it('should update last name', () => {
    const lastName = 'Vikander';
    expect(
      Account.default(undefined, {
        type: Account.UPDATE_ACCOUNT_LAST_NAME,
        lastName
      })
    ).toEqual(
      Map({
        user: {},
        error: '',
        isFetching: false,
        firstName: '',
        lastName,
        email: '',
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        message: ''
      })
    );
  });

  it('should update email', () => {
    const email = 'alicia@cc.cc';
    expect(
      Account.default(undefined, {
        type: Account.UPDATE_ACCOUNT_EMAIL,
        email
      })
    ).toEqual(
      Map({
        user: {},
        error: '',
        isFetching: false,
        firstName: '',
        lastName: '',
        email,
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        message: ''
      })
    );
  });

  it('should create updated message', () => {
    const message = 'Updated!';
    expect(
      Account.default(undefined, {
        type: Account.UPDATED_MESSAGE,
        message
      })
    ).toEqual(
      Map({
        user: {},
        error: '',
        isFetching: false,
        firstName: '',
        lastName: '',
        email: '',
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        message
      })
    );
  });

  it('should clear message', () => {
    expect(
      Account.default(undefined, {
        type: Account.CLEAR_UPDATED_MESSAGE,
      })
    ).toEqual(
      Map({
        user: {},
        error: '',
        isFetching: false,
        firstName: '',
        lastName: '',
        email: '',
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        message: ''
      })
    );
  });

  it('should warn first name error', () => {
    const firstNameError = 'Some error!';
    expect(
      Account.default(undefined, {
        type: Account.ACCOUNT_FIRST_NAME_ERROR,
        firstNameError
      })
    ).toEqual(
      Map({
        user: {},
        error: '',
        isFetching: false,
        firstName: '',
        lastName: '',
        email: '',
        firstNameError,
        lastNameError: '',
        emailError: '',
        message: ''
      })
    );
  });

  it('should warn last name error', () => {
    const lastNameError = 'Some error!';
    expect(
      Account.default(undefined, {
        type: Account.ACCOUNT_LAST_NAME_ERROR,
        lastNameError
      })
    ).toEqual(
      Map({
        user: {},
        error: '',
        isFetching: false,
        firstName: '',
        lastName: '',
        email: '',
        firstNameError: '',
        lastNameError,
        emailError: '',
        message: ''
      })
    );
  });

  it('should warn email error', () => {
    const emailError = 'Some error!';
    expect(
      Account.default(undefined, {
        type: Account.ACCOUNT_EMAIL_ERROR,
        emailError
      })
    ).toEqual(
      Map({
        user: {},
        error: '',
        isFetching: false,
        firstName: '',
        lastName: '',
        email: '',
        firstNameError: '',
        lastNameError: '',
        emailError,
        message: ''
      })
    );
  });

  it('should start fetching user', () => {
    expect(
      Account.default(undefined, {
        type: Account.FETCHING_ACCOUNT_USER,
      })
    ).toEqual(
      Map({
        user: {},
        error: '',
        isFetching: true,
        firstName: '',
        lastName: '',
        email: '',
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        message: ''
      })
    );
  });


  it('should handle fetching user successfully', () => {
    const user = Map({ name: 'Alicia' });
    expect(
      Account.default(undefined, {
        type: Account.FETCHING_ACCOUNT_USER_SUCCESS,
        user
      })
    ).toEqual(
      Map({
        user,
        error: '',
        isFetching: false,
        firstName: '',
        lastName: '',
        email: '',
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        message: ''
      })
    );
  });

  it('should handle fetching user failure', () => {
    const error = 'Could not fetch ...';
    expect(
      Account.default(undefined, {
        type: Account.FETCHING_ACCOUNT_USER_FAILURE,
        error
      })
    ).toEqual(
      Map({
        user: {},
        error,
        isFetching: false,
        firstName: '',
        lastName: '',
        email: '',
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        message: ''
      })
    );
  });

});

/************************************
 * Redux - Account - Action Creators
 ************************************/
describe('[Redux - Account] action creators - fetchUser()', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('creates FETCHING_ACCOUNT_USER_SUCCESS if successfuly fetched the user', () => {
    nock(ROOT_URL)
      .get('/api/users/account')
      .reply(200, {
        first_name: 'Alicia'
      });
    
    const user = Map({
      first_name: 'Alicia'
    });

    const expectedActions = [
      { type: Account.FETCHING_ACCOUNT_USER },
      { type: Account.FETCHING_ACCOUNT_USER_SUCCESS, user }
    ];

    const store = mockStore({ });

    return store.dispatch(Account.fetchUser())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
      .catch(() => {});
  });

  it('creates FETCHING_ACCOUNT_USER_FAILURE if failed to fetch the user', () => {
    nock(ROOT_URL)
      .get('/api/users/account')
      .reply(400, { error: 'erererer' });

    const expectedActions2 = [
      { type: Account.FETCHING_ACCOUNT_USER },
      { type: Account.FETCHING_ACCOUNT_USER_FAILURE, error: 'Could not get the user infomation.' }
    ];
    const store = mockStore({ });

    return store.dispatch(Account.fetchUser())
      .then()
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions2)
      });
  });
});

describe('[Redux - Account] action creators - updateUser()', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  // Need fake user logged in
  it('creates FETCHING_ACCOUNT_USER_SUCCESS if successfuly updated the user', () => {
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
          first_name: 'Alice',
          last_name: 'Smith',
          email: 'alice@cc.cc'
        }
      });

    // Delay it a little ot make sure user is signed in
    // before sending update
    // setTimeout(() => {
      nock(ROOT_URL)
        .put('/api/users/account', userObject)
        .reply(200, { data: userObject });

      const expectedActions = [
        { type: Account.UPDATED_MESSAGE, message: 'Updated!' },
        { type: Account.CLEAR_UPDATED_MESSAGE },
        { type: Account.FETCHING_ACCOUNT_USER_SUCCESS, user: userObject }
      ];

      const store = mockStore({ });

      return store.dispatch(Account.updateUser(userObject))
        .then(res => expect(store.getActions()).toEqual(expectedActions))
        .catch(() => {});
    // }, 100);

  });

  it('creates FETCHING_ACCOUNT_USER_FAILURE if failed to update the user', () => {
    const userObject = {
      first_name: 'David',
      last_name: 'Smith',
      email: 'david@cc.cc'
    };

    nock(ROOT_URL)
      .put('/api/users/account', userObject)
      .reply(400, { data: userObject });

    const expectedActions = [
      { type: Account.FETCHING_ACCOUNT_USER_FAILURE, error: 'Could not update.' }
    ];

    const store = mockStore({ });

    return store.dispatch(Account.updateUser(userObject))
      .then()
      .catch(err => expect(store.getActions()).toEqual(expectedActions));
  });
});

/******************************
 * Redux - Account - Validations
 ******************************/
describe('[Validations] validateEmail()', () => {
  it('should warn if email is less than 4 characters', () => {
    const email = 'aa.';
    const expectedAction = {
      type: Account.ACCOUNT_EMAIL_ERROR,
      emailError: 'Email is required',
    };

    const store = mockStore({ });

    expect(store.dispatch(Account.validateEmail(email))).toEqual(expectedAction); 
  });

  it('should warn if email is longer than 50 characters', () => {
    const email = 'aaaaaaaaaaaaaaaaaaasddsfjldafdsljfhljsdahfkadsfjdfdsjkfdsfjsdfjklfljksdafhjksdhfjkdsfhsjdklafhsdjkf';
    const expectedAction = {
      type: Account.ACCOUNT_EMAIL_ERROR,
      emailError: 'Your email address is too long',
    };

    const store = mockStore({ });

    expect(store.dispatch(Account.validateEmail(email))).toEqual(expectedAction); 
  });

  it('should warn if email is invalid', () => {
    const email = 'aadsfa34@..';
    const expectedAction = {
      type: Account.ACCOUNT_EMAIL_ERROR,
      emailError: 'Please enter a valid email address',
    };

    const store = mockStore({ });

    expect(store.dispatch(Account.validateEmail(email))).toEqual(expectedAction); 
  });
});

describe('[Validations] validateFirstName()', () => {
  it('should warn if input is longer than 29 characters', () => {
    const firstName = 'aadsfakldsjfkldsajfsdfldsjflkjsdfsdlkfjsaldfsd klsdjfsdfjklsdjflksdsdfsdfsl';
    const expectedAction = {
      type: Account.ACCOUNT_FIRST_NAME_ERROR,
      firstNameError: 'First Name must be shorter than 30 characters',
    };

    const store = mockStore({ });

    expect(store.dispatch(Account.validateFirstName(firstName))).toEqual(expectedAction); 
  });

  it('should warn if input is empty', () => {
    const firstName = '';
    const expectedAction = {
      type: Account.ACCOUNT_FIRST_NAME_ERROR,
      firstNameError: 'First Name is required',
    };

    const store = mockStore({ });

    expect(store.dispatch(Account.validateFirstName(firstName))).toEqual(expectedAction); 
  })
});

describe('[Validations] validateLastName()', () => {
  it('should warn if input is longer than 29 characters', () => {
    const lastName = 'aadsfakldsjfkldsajfsdfldsjflkjsdfsdlkfjsaldfsd klsdjfsdfjklsdjflksdsdfsdfsl';
    const expectedAction = {
      type: Account.ACCOUNT_LAST_NAME_ERROR,
      lastNameError: 'Last Name must be shorter than 30 characters',
    };

    const store = mockStore({ });

    expect(store.dispatch(Account.validateLastName(lastName))).toEqual(expectedAction); 
  });

  it('should warn if input is empty', () => {
    const lastName = '';
    const expectedAction = {
      type: Account.ACCOUNT_LAST_NAME_ERROR,
      lastNameError: 'Last Name is required',
    };

    const store = mockStore({ });

    expect(store.dispatch(Account.validateLastName(lastName))).toEqual(expectedAction); 
  })
});
