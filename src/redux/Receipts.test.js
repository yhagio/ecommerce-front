import { fromJS } from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock'
import * as Receipts from './Receipts';
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
 * Redux - Receipts - Actions
 ******************************/
describe('[Redux - Receipts] actions', () => {
  it('should create an action when fetching', () => {
    const expectedAction = {
      type: Receipts.FETCHING_RECEIPTS
    };
    expect(Receipts.fetchingReceipts()).toEqual(expectedAction);
  });

  it('should create an action when fetched receipts', () => {
    const receipts = [{ id: 123, naem: 'some name'}];
    const expectedAction = {
      type: Receipts.FETCHING_RECEIPTS_SUCCESS,
      receipts,
    };
    expect(Receipts.fetchingReceiptsSuccess(receipts)).toEqual(expectedAction);
  });

  it('should create an action when failed to fetch receipts', () => {
    const error = 'Could not get the product list.';
    const expectedAction = {
      type: Receipts.FETCHING_RECEIPTS_FAILURE,
      error
    };
    expect(Receipts.fetchingReceiptsError(error)).toEqual(expectedAction);
  });
});

/******************************
 * Redux - Receipts - Reducers
 ******************************/
describe('[Redux - Receipts] reducers', () => {
  it('should return the initial state', () => {
    expect(
      Receipts.default(undefined, {})
    ).toEqual(
      fromJS({
        receipts: [],
        error: '',
        isFetching: false
      })
    );
  });

  it('should handle FETCHING_RECEIPTS', () => {
    expect(
      Receipts.default(undefined, {
        type: Receipts.FETCHING_RECEIPTS
      })
    ).toEqual(
      fromJS({
        receipts: [],
        error: '',
        isFetching: true
      })
    );
  });

  it('should handle FETCHING_RECEIPTS_FAILURE', () => {
    const error = 'Could not retrieve any receipts.';
    expect(
      Receipts.default(undefined, {
        type: Receipts.FETCHING_RECEIPTS_FAILURE,
        error
      })
    ).toEqual(
      fromJS({
        receipts: [],
        error,
        isFetching: false
      })
    );
  });

  it('should handle FETCHING_RECEIPTS_SUCCESS', () => {
    const receipts = fromJS([{ id: 123, name: 'some name' }]);
    expect(
      Receipts.default(undefined, {
        type: Receipts.FETCHING_RECEIPTS_SUCCESS,
        receipts
      })
    ).toEqual(
      fromJS({
        receipts,
        error: '',
        isFetching: false
      })
    );
  });
});

/************************************
 * Redux - Receipts - Action Creators
 ************************************/
describe('[Redux - Receipts] action creators - fetchReceipts()', () => {
  //
  afterEach(() => {
    nock.cleanAll()
  });

  it('successfully fetched a Receipts', () => {
    // Signup a user
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

    // Retrieve user's receipts
    const receipts = []
    nock(ROOT_URL)
      .get('/api/account/receipts')
      .reply(200, {
        data: {
          receipts
        }
      });

    const expectedActions = [
      { type: Receipts.FETCHING_RECEIPTS },
      { type: Receipts.FETCHING_RECEIPTS_SUCCESS, receipts }
    ];

    const store = mockStore({ });
    
    return store.dispatch(Receipts.fetchReceipts())
      .then(res => expect(store.getActions()).toEqual(expectedActions))
      .catch(() => {});
  });

  it('failed to fetch receipts', () => {
    nock(ROOT_URL)
      .get('/api/account/receipts')
      .reply(400);

    const expectedActions = [
      { type: Receipts.FETCHING_RECEIPTS },
      { type: Receipts.FETCHING_RECEIPTS_FAILURE, error: 'Could not retrieve any receipts.' },
    ];

    const store = mockStore({ });
    
    return store.dispatch(Receipts.fetchReceipts(123))
      .then()
      .catch(err => expect(store.getActions()).toEqual(expectedActions))
  });
});