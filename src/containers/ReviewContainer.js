// import React, { Component, PropTypes } from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as reviewFormActions from '../redux/ReviewForm';
// import ReviewForm from '../components/ReviewForm';

// class ReviewFormContainer extends Component {
//   render() {
//     return (
//       <ReviewForm
//         error={ this.props.error }
//         body={ this.props.body }
//         rating={ this.props.rating } 
//         submitReview={ this.props.submitReview } />
//     )
//   }
// }

// const { string, func } = PropTypes;

// ReviewFormContainer.propTypes = {
//   submitReview: func.isRequired,
//   error: string.isRequired,
//   body: string.isRequired,
//   rating: string.isRequired,
// }

// function mapStateToProps({ reviewForm }) {
//   return {
//     error: reviewForm.get('error'),
//     body: reviewForm.get('body'),
//     rating: reviewForm.get('rating'),
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(reviewFormActions, dispatch);
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ReviewFormContainer);