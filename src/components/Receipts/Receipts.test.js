import React from 'react';
import { List, Map } from 'immutable';
import { shallow } from 'enzyme';
import Receipts from './Receipts';

describe('[Component Receipts]', () => {
  it('should display fetching', () => {
    const ReceiptsComponent
      = <Receipts 
          receipts={ List([]) }
          isFetching={true}
          error='' />
    let wrapper = shallow(ReceiptsComponent);
    expect(wrapper.find('h3').text()).toEqual('Fetching ...');
  });

  it('should display no receipts message', () => {
    const ReceiptsComponent
      = <Receipts 
          receipts={ List([]) }
          isFetching={false}
          error='' />
    let wrapper = shallow(ReceiptsComponent);
    expect(wrapper.find('h3').text()).toEqual('No receipts Found');
  });

  it('should display receipts list', () => {
    const ReceiptsComponent
      = <Receipts
          receipts={ List([
            Map({ id: 1, product_id: 1, price: 12.5, description: 'JP101' }), Map({ id: 2, product_id: 2, price: 12.5, description: 'JP102' })
          ]) }
          isFetching={ false }
          error='' />
    let wrapper = shallow(ReceiptsComponent);
    expect(wrapper.find('.receiptList').containsMatchingElement(<h4 className="receiptTitle">JP101</h4>)).toEqual(true);
  });
});