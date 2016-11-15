import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import ReviewForm from './ReviewForm';

export default function Product (props) {
  const token = localStorage.getItem('token');
  let reviews = [];
  if (Object.keys(props.product).length > 0) {
    props.product.get('reviews').forEach((review) => {
      reviews.push(
        <li key={ review.get('id') } className="reviewItem">
          <p>{ review.get('rating') } stars</p>
          <p>{ review.get('body') }</p>
          <p>{ review.get('updatedAt') }</p>
        </li>
      );
    });
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
            { token
              ? props.product.get('purchased')
                ? <Link to={`/products/${ props.product.get('id') }/purchased`}>Read</Link>
                : <button className="addButton" onClick={ (e) => props.addToCart(props.product.get('id'))}>Add to cart</button> 
              : '' }
            <br />
            <span className="addToCartMessage">{ props.message }</span>
          </div>
        </div>
        
        <div className="productReviews">
          <h3>Reviews (401)</h3>
          { props.product.get('purchased')
            ? <ReviewForm
                productId={ props.product.get('id') }
                submitReview={ props.submitReview }
                updateReviewBody={ props.updateReviewBody }
                updateReviewRating={ props.updateReviewRating }
                reviewFormError={ props.reviewFormError }                reviewBody={ props.reviewBody }
                reviewRating={ props.reviewRating } />
            : '' }
          <ul>
            { reviews.length > 0 ? reviews: 'No reviews yet.' }
          </ul>
        </div>
      </div>)
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,

  submitReview: PropTypes.func.isRequired,
  updateReviewBody: PropTypes.func.isRequired,
  updateReviewRating: PropTypes.func.isRequired,
  reviewFormError: PropTypes.string.isRequired,
  reviewBody: PropTypes.string.isRequired,
  reviewRating: PropTypes.string.isRequired,
}; 