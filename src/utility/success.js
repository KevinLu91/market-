import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';

import { postProductSuccess } from '../redux';

const Success = (props) => {
  return (
    <>
      <Snackbar
        open={props.productData.success}
        autoHideDuration={3000}
        onClose={() => props.postProductSuccess(false)}
      >
        <Alert
          severity='success'
          onClose={() => props.postProductSuccess(false)}
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
