import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';

import { postProductSuccess } from '../redux';

const Success = (props) => {
  return (
    <>
      <Snackbar
        open={
          props.snackSuccess ? props.snackSuccess : props.productData.success
        }
        autoHideDuration={3000}
        onClose={
          props.setSnackSuccess
            ? () => props.setSnackSuccess(false)
            : () => props.postProductSuccess(false)
        }
      >
        <Alert
          severity='success'
          onClose={
            props.setSnackSuccess
              ? () => props.setSnackSuccess(false)
              : () => props.postProductSuccess(false)
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
    postProductSuccess: (success) => dispatch(postProductSuccess(success)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Success);
