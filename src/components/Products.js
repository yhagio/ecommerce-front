import React, { PropTypes } from 'react';

export default function Products (props) {
  let productList = [];
  props.products.forEach((product, x) => {
    productList.push(
      <a href="products/1" key={ x } className="productItem">
        <li>
          <h4 className="productTitle">{ product.get('name') }</h4>
          <img src="" alt="product" className="productImage" />
          <p className="price">Price: <span>{ product.get('price') }</span></p>
        </li>
      </a>    
    );
  })

  return props.isFetching
  ? <h3>Fetching ...</h3>
  : (
    <div className="productsContainer">
      <ul className="productList">
        { productList }
      </ul>
    </div>
  )
}

Products.propTypes = {

};