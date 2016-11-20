import { checkIfAuthenticated, setHeaders, numToMonth, getFormattedDate } from './utils';

// export function setHeaders () {
//   const token = localStorage.getItem('token');
//   let config = {};
//   config = {
//     headers: { 'Authorization': `Bearer ${token}` }
//   };
//   return config;
// }

describe('[Helpers] setHeaders()', () => {
  it('returns config', () => {
    global.localStorage = { 
      getItem: function(key) {
        return 'token-value';
      }
    };

    const expectedConfig = {
      headers: { 'Authorization': `Bearer token-value` }
    }

    expect(setHeaders()).toEqual(expectedConfig);
  });
});

describe('[Helpers] checkIfAuthenticated()', () => {
  it('returns false if token is not defined', () => {
    global.localStorage = { 
      getItem: function(key) {
        return 'Value';
      }
    };
    let store = {
      getState: function() {
        this.user = {
          isAuthenticated: false
        };
        return this;
      }
    };
    let token = '';
    expect(checkIfAuthenticated(store, token)).toBe(false);
  });

  it('returns true if the user is authenticated', () => {
    let store = {
      getState: function() {
        this.user = {
          isAuthenticated: true
        };
        return this;
      }
    };
    let token = 'randomtoken';
    expect(checkIfAuthenticated(store, token)).toBe(true);
  });
});

describe('[Helpers] getFormattedDate(rawDate)', () => {
  it('returns formatted date 1', () => {
    expect(getFormattedDate(1005019905043)).toEqual('Nov 05, 2001');
  });

  it('returns formatted date 2', () => {
    expect(getFormattedDate(105019995343)).toEqual('Apr 30, 1973');
  });
});

describe('[Helpers] numToMonth(month)', () => {
  it('returns Jan if month is 1', () => {
    expect(numToMonth(1)).toEqual('Jan');
  });

  it('returns Feb if month is 2', () => {
    expect(numToMonth(2)).toEqual('Feb');
  });

  it('returns Mar if month is 3', () => {
    expect(numToMonth(3)).toEqual('Mar');
  });

  it('returns Apr if month is 4', () => {
    expect(numToMonth(4)).toEqual('Apr');
  });

  it('returns May if month is 5', () => {
    expect(numToMonth(5)).toEqual('May');
  });

  it('returns Jun if month is 6', () => {
    expect(numToMonth(6)).toEqual('Jun');
  });

  it('returns Jul if month is 7', () => {
    expect(numToMonth(7)).toEqual('Jul');
  });

  it('returns Aug if month is 8', () => {
    expect(numToMonth(8)).toEqual('Aug');
  });

  it('returns Sep if month is 9', () => {
    expect(numToMonth(9)).toEqual('Sep');
  });

  it('returns Oct if month is 10', () => {
    expect(numToMonth(10)).toEqual('Oct');
  });

  it('returns Nov if month is 11', () => {
    expect(numToMonth(11)).toEqual('Nov');
  });

  it('returns Dec if month is 12', () => {
    expect(numToMonth(12)).toEqual('Dec');
  });
});