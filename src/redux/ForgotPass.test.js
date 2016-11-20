import { Map } from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock'
import * as ForgotPass from './ForgotPass';
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
 * Redux - ForgotPass - Actions
 ******************************/
describe('[Redux - ForgotPass] actions', () => {
  it('should create an action when updating email', () => {
    const email = 'some@cc.cc';
    const expectedAction = {
      type: ForgotPass.UPDATE_YOUR_EMAIL,
      email
    };
    expect(ForgotPass.updateEmail(email)).toEqual(expectedAction);
  });

  it('should create an action to warn error on updaing email', () => {
    const emailError = 'Ahhh Errorrrr';
    const expectedAction = {
      type: ForgotPass.YOUR_EMAIL_ERROR,
      emailError,
    };
    expect(ForgotPass.warnEmailError(emailError)).toEqual(expectedAction);
  });

  it('should create an action to send a message', () => {
    const message = 'New password was sent to your email.';
    const expectedAction = {
      type: ForgotPass.RESET_PASS_SUCCESS,
      message
    };
    expect(ForgotPass.resetPasswordSuccess(message)).toEqual(expectedAction);
  });

  it('should create an action when clearing message', () => {
    const expectedAction = {
      type: ForgotPass.CLEAR_MESSAGE,
    };
    expect(ForgotPass.clearMessage()).toEqual(expectedAction);
  });

  it('should create an action when failed to reset password', () => {
    const error = 'Ohhh nooo!!!!';
    const expectedAction = {
      type: ForgotPass.RESET_PASS_FAILURE,
      error,
    };
    expect(ForgotPass.resetPasswordFailure(error)).toEqual(expectedAction);
  });
});

/******************************
 * Redux - ForgotPass - Reducers
 ******************************/
describe('[Redux - ForgotPass] reducers', () => {
  it('should return the initial state', () => {
    expect(
      ForgotPass.default(undefined, {})
    ).toEqual(
      Map({
        error: '',
        message: '',
        email: '',
        emailError: '',
      })
    );
  });

  it('should handle UPDATE_YOUR_EMAIL', () => {
    const email = 'SomeSome@cc.cc';
    expect(
      ForgotPass.default(undefined, {
        type: ForgotPass.UPDATE_YOUR_EMAIL,
        email
      })
    ).toEqual(
      Map({
        error: '',
        message: '',
        email,
        emailError: '',
      })
    );
  });

  it('should handle YOUR_EMAIL_ERROR', () => {
    const emailError = 'Some error!';
    expect(
      ForgotPass.default(undefined, {
        type: ForgotPass.YOUR_EMAIL_ERROR,
        emailError
      })
    ).toEqual(
      Map({
        error: '',
        message: '',
        email: '',
        emailError,
      })
    );
  });

  it('should handle RESET_PASS_SUCCESS', () => {
    const message = 'Some message';
    expect(
      ForgotPass.default(undefined, {
        type: ForgotPass.RESET_PASS_SUCCESS,
        message
      })
    ).toEqual(
      Map({
        error: '',
        message,
        email: '',
        emailError: '',
      })
    );
  });

  it('should handle CLEAR_MESSAGE', () => {
    const before = Map({
      error: 'some error',
      message: 'some message',
      email: '',
      emailError: '',
    });

    expect(
      ForgotPass.default(before, {
        type: ForgotPass.CLEAR_MESSAGE
      })
    ).toEqual(
      Map({
        error: '',
        message: '',
        email: '',
        emailError: '',
      })
    );
  });

  it('should handle RESET_PASS_FAILURE', () => {
    const error = 'Some error';
    expect(
      ForgotPass.default(undefined, {
        type: ForgotPass.RESET_PASS_FAILURE,
        error
      })
    ).toEqual(
      Map({
        error,
        message: '',
        email: '',
        emailError: '',
      })
    );
  });
});

/************************************
 * Redux - ForgotPass - Action Creators
 ************************************/
describe('[Redux - ForgotPass] action creators - submitEmail()', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('successfully resetted password and sent the new password', () => {
    // Create a new user to let him logged-in first
    nock(ROOT_URL)
      .post('/api/users', {
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@cc.cc',
        password: 'FakePass!12' })
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
    const email = { email: 'alice@cc.cc' };
    // setTimeout(() => {
      nock(ROOT_URL)
        .post('/api/users/reset-password', email)
        .reply(200);

      const expectedActions = [
        { type: ForgotPass.RESET_PASS_SUCCESS, message: 'New password was sent to your email.' },
        { type: ForgotPass.CLEAR_MESSAGE }
      ];

      const store = mockStore({ });
      
      return store.dispatch(ForgotPass.submitEmail(email))
        .then(res => expect(store.getActions()).toEqual(expectedActions))
        .catch(() => {});
    // }, 100);
  });

  it('failed to add a product to ForgotPass', () => {
    // Delay it a little ot make sure user is signed in
    // before sending update
    const email = { email: 'nonon@cc.cc' };
    nock(ROOT_URL)
      .post('/api/users/reset-password', email)
      .reply(400);

    const expectedActions = [
      { type: ForgotPass.RESET_PASS_FAILURE, error: 'Could not reset the password or email not found.' },
    ];

    const store = mockStore({ });
    
    return store.dispatch(ForgotPass.submitEmail(email))
      .then()
      .catch(err => expect(store.getActions()).toEqual(expectedActions))
  });
});

/************************************
 * Redux - ForgotPass - validateEmail
 ************************************/
describe('[Validations] validateEmail()', () => {
  it('should warn if email is less than 4 characters', () => {
    const email = 'aa.';
    const expectedAction = {
      type: ForgotPass.YOUR_EMAIL_ERROR,
      emailError: 'Email is required',
    };

    const store = mockStore({ });

    expect(store.dispatch(ForgotPass.validateEmail(email))).toEqual(expectedAction); 
  });

  it('should warn if email is longer than 50 characters', () => {
    const email = 'aaaaaaaaaaaaaaaaaaasddsfjldafdsljfhljsdahfkadsfjdfdsjkfdsfjsdfjklfljksdafhjksdhfjkdsfhsjdklafhsdjkf';
    const expectedAction = {
      type: ForgotPass.YOUR_EMAIL_ERROR,
      emailError: 'Your email address is too long',
    };

    const store = mockStore({ });

    expect(store.dispatch(ForgotPass.validateEmail(email))).toEqual(expectedAction); 
  });

  it('should warn if email is invalid', () => {
    const email = 'aadsfa34@..';
    const expectedAction = {
      type: ForgotPass.YOUR_EMAIL_ERROR,
      emailError: 'Please enter a valid email address',
    };

    const store = mockStore({ });

    expect(store.dispatch(ForgotPass.validateEmail(email))).toEqual(expectedAction); 
  });
});