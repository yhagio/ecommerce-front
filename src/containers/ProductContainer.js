import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as productActions from '../redux/Product';
import * as cartActions from '../redux/Cart';
import * as reviewFormActions from '../redux/ReviewForm';
import Product from '../components/Product/Product';

class ProductContainer extends Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.params.id);
  }

  render() {
    return (
      <Product
        product={ this.props.product }
        isFetching={ this.props.isFetching }
        error={ this.props.error }
        addToCart={ this.props.addToCart }
        message={ this.props.message }
        cartError={ this.props.cartError }
        submitReview={ this.props.submitReview }
        deleteReview={ this.props.deleteReview }
        updateReviewBody={ this.props.updateReviewBody }
        updateReviewRating={ this.props.updateReviewRating }
        reviewFormError={ this.props.reviewFormError }
        reviewBody={ this.props.reviewBody }
        reviewRating={ this.props.reviewRating } />
    )
  }
}

ProductContainer.propTypes = {
  fetchProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  cartError: PropTypes.string.isRequired,
  submitReview: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired,
  updateReviewBody: PropTypes.func.isRequired,
  updateReviewRating: PropTypes.func.isRequired,
  reviewFormError: PropTypes.string.isRequired,
  reviewBody: PropTypes.string.isRequired,
  reviewRating: PropTypes.string.isRequired,
};

function mapStateToProps({ product, cart, user, reviewForm }) {
  return {
    product: product.get('product'),
    isFetching: product.get('isFetching'),
    error: product.get('error'),
    message: cart.get('message'),
    cartError: cart.get('error'),
    reviewFormError: reviewForm.get('error'),
    reviewBody: reviewForm.get('body'),
    reviewRating: reviewForm.get('rating'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...productActions,
    ...cartActions,
    ...reviewFormActions
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductContainer);