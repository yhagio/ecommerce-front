import React, { PropTypes } from 'react';

export default function Products () {
  let products = [];
  for (let i = 0; i < 51; i++) {
    products.push(
      <a href="products/1" key={i} className="productItem">
        <li>
          <h4 className="productTitle">Title</h4>
          <img src="" alt="product" className="productImage" />
          <p className="price">Price: <span>$12.50</span></p>
        </li>
      </a>
    )
  }

  return (
    <div className="productsContainer">
      <ul className="productList">
        {products}
      </ul>
    </div>
  )
}

Products.propTypes = {

};