import React, { PropTypes } from 'react';

export default function Product () {
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

  return (
    <div>
      <div className="productContainer">
        <div className="imageBox">
          <img className="productImageLarge" src="" alt="Product" />
        </div>

        <div className="details">
          <h3>Product Title</h3>
          <p>Price: <span>$18.50</span></p>
          <p>5 stars</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam asperiores voluptatibus quis voluptatum dignissimos, debitis eveniet reiciendis, perferendis ut doloribus, voluptate cupiditate autem. Commodi amet cupiditate facere provident dolor natus.
          </p>
          <button className="addButton">Add to cart</button>
        </div>
      </div>
      
      <div className="productReviews">
        <h3>Reviews (401)</h3>

        <ul>
          { reviews }
        </ul>
      </div>
    </div>
  )
}

Product.propTypes = {

};