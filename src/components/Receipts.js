import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { List } from 'immutable';
import './receipts.css';

export default function Receipts (props) {
  let receipts = [];
  props.receipts.forEach((receipt) => {
    receipts.push(
      <Link
        to={ `/products/${ receipt.get('product_id') }/purchased` }
        key={ receipt.get('id') }
        className="receiptItem">
        <li>
          <h4 className="receiptTitle">{ receipt.get('description') }</h4>
          <p className="receiptPrice">CA$<span>{ receipt.get('price') }</span></p>
        </li>
      </Link>    
    );
  })

  return props.isFetching
  ? <h3>Fetching ...</h3>
  : props.receipts.size === 0 || props.error.length > 0
    ? <h3>No receipts Found</h3>
    : <div className="receiptsContainer">
        <h3>Purchased products</h3>
        <p>* Click to read</p>
        <ul className="receiptList">
          { receipts }
        </ul>
      </div>
}

Receipts.propTypes = {
  receipts: PropTypes.instanceOf(List),
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};