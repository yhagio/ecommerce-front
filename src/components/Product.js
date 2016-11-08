import React, { PropTypes } from 'react';

export default function Product (props) {
  let reviews = [];
  for (let i = 0; i < 12; i++) {
    reviews.push(
      <li key={i} className="reviewItem">
        <p>Marylou</p>
        <p>4 stars</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam asperiores voluptatibus quis voluptatum dignissimos, debitis eveniet reiciendis, perferendis ut doloribus, voluptate cupiditate autem. Commodi amet cupiditate facere provident dolor natus.
        </p>
        <p>2016/10/05</p>
      </li>
    )
  }

  return props.isFetching
  ? <h3>Loading ...</h3>
  : Object.keys(props.product).length === 0 || props.error.length > 0 
    ? <h3>No Product Found</h3>
    : (<div>
        <div className="productContainer">
          <div className="imageBox">
            <img className="productImageLarge" src="" alt="Product" />
          </div>

          <div className="details">
            <h3>{ props.product.get('name') }</h3>
            <p>Price: <span>${ props.product.get('price') }</span></p>
            <p>5 stars</p>
            <p>{ props.product.get('description') }</p>
            <button className="addButton">Add to cart</button>
          </div>
        </div>
        
        <div className="productReviews">
          <h3>Reviews (401)</h3>

          <ul>
            { reviews }
          </ul>
        </div>
      </div>)
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
}; 