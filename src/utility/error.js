import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';

import { postProductFailure } from '../redux';

const Error = (props) => {
  return (
    <>
      <Snackbar
        open={props.snackFailed ? props.snackFailed : props.productData.error}
        autoHideDuration={3000}
        onClose={
          props.setSnackFailed
            ? () => props.setSnackFailed(false)
            : () => props.postProductFailure(false)
        }
      >
        <Alert
          severity='error'
          onClose={
            props.setSnackFailed
              ? () => props.setSnackFailed(false)
              : () => props.postProductFailure(false)
          }
        >
          {props.message}
        </Alert>
      </Snackbar>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    productData: state.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postProductFailure: (boolean) => dispatch(postProductFailure(boolean)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Error);
