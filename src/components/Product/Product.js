import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import ReviewForm from '../ReviewForm/ReviewForm';
import { getFormattedDate } from '../../helpers/utils';
import './product.css';
// Image from: http://loremflickr.com/250/320
import productImage from '../product.jpeg';

export default function Product (props) {
  const token = localStorage.getItem('token');

  // Product review list
  let reviews = [];
  // Check if the user already posted a review for this product
  let postedReview = false;
  // Average rating
  let totalRatings = 0;
  let averageRating;

  if (Object.keys(props.product).length > 0) {
    const authedId = props.product.get('authedId');

    props.product.get('reviews').forEach((review) => {
      totalRatings += review.get('rating');
      if (review.get('user_id') === authedId) {
        postedReview = true;
      }
      reviews.push(
        <li key={ review.get('id') } className="reviewItem">
          <p>Rating: { review.get('rating') } / 5</p>
          <p className="reviewBody">{ review.get('body') }</p>
          <p>{ getFormattedDate(review.get('updatedAt')) }</p>
          {/* Show delete button if the user is the owner of this review */}
          { review.get('user_id') === authedId 
            ? <button onClick={ (e) => props.deleteReview(review.get('product_id')) } className="deleteButton">X</button>
            : '' }
        </li>
      );
    });

    averageRating = (totalRatings / reviews.length);
    isNaN(averageRating) ? averageRating = 'N/A' : averageRating = Math.round(averageRating * 10) / 10;
  }

  return props.isFetching
  ? <h3>Loading ...</h3>
  // Make sure product object is loaded & there is no error
  : Object.keys(props.product).length === 0 || props.error.length > 0 
    ? <h3>No Product Found</h3>
    : (<div>
        <div className="productContainer">
          <div className="imageBox">
            <img className="productImageLarge" src={ productImage } alt="Product" />
          </div>

          <div className="details">
            <h3>{ props.product.get('name') }</h3>
            <p>Price: <span>${ props.product.get('price') }</span></p>
            <p>Average Rating: { averageRating }</p>
            <p className="description">{ props.product.get('description') }</p>
            {/* Check if user has token (logged-in) & 
                Check if user purchased this product, if yes, show Link */}
            { token
              ? props.product.get('purchased')
                ? <Link 
                    to={`/products/${ props.product.get('id') }/purchased`}
                    className="readButton">Read</Link>
                : <button className="addButton" onClick={ (e) => props.addToCart(props.product.get('id'))}>Add to cart</button> 
              : '' }
            <br />
            { props.message
              ? <span className="addToCartMessage">{ props.message }</span>
              : null }
            { props.cartError
              ? <span className="cartError">{ props.cartError }</span>
              : null }
          </div>
        </div>
        
        <div className="productReviews">
          <h3 className="reviewTitle">Reviews ({ reviews.length })</h3>
          {/* Display review form */}
          { props.product.get('purchased') && postedReview === false
            ? <ReviewForm
                productId={ props.product.get('id') }
                submitReview={ props.submitReview }
                updateReviewBody={ props.updateReviewBody }
                updateReviewRating={ props.updateReviewRating }
                reviewFormError={ props.reviewFormError }                reviewBody={ props.reviewBody }
                reviewRating={ props.reviewRating } />
            : '' }
          <ul className="reviewList">
            {/* Display reviews */}
            { reviews.length > 0 
              ? reviews.reverse()
              : 'No reviews yet.' }
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
  cartError: PropTypes.string.isRequired,

  submitReview: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired,
  updateReviewBody: PropTypes.func.isRequired,
  updateReviewRating: PropTypes.func.isRequired,
  reviewFormError: PropTypes.string.isRequired,
  reviewBody: PropTypes.string.isRequired,
  reviewRating: PropTypes.string.isRequired,
}; 