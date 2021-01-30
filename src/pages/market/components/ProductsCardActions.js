import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Button,
  CardActions,
  Popover,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { API, graphqlOperation } from 'aws-amplify';

import { useStyles } from './ProductsStyle';
import {
  editProduct,
  addProduct,
  postProductSuccess,
  postProductFailure,
} from '../../../redux';
import { deleteProduct } from '../../../graphql/mutations';
import Success from '../../../utility/success';
import Error from '../../../utility/error';

const ProductsCardActions = (props) => {
  const [deletePopover, setDeletePopover] = useState(null);
  const [loading, setLoading] = useState(false);
  const open = Boolean(deletePopover);
  const classes = useStyles();

  const handleEdit = () => {
    props.addProduct(props.product);
    props.editProduct(true);
  };

  const handleDeleteProduct = async () => {
    try {
      setLoading(true);
      const input = {
        id: props.product.id,
      };
      await API.graphql(graphqlOperation(deleteProduct, { input }));
      props.postProductSuccess(true);
      setTimeout(() => {
        setLoading(false);
        setDeletePopover(null);
      }, 2000);
    } catch (err) {
      setLoading(false);
      props.postProductFailure(true);
      console.log(err);
    }
  };

  return (
    <CardActions className={classes.cardAction}>
      <Success message='Successfully deleted product!' />
      <Error message='Failed to delete product, try again!' />
      {props.product.owner !== props.userData.user.attributes.sub ? (
        <Button variant='contained' startIcon={<CreateIcon />}>
          Buy
        </Button>
      ) : (
        <Box className={classes.cardAction__buttonContainer}>
          <Button variant='contained' onClick={handleEdit}>
            Edit
          </Button>
          <div>
            <Popover
              open={open}
              anchorEl={deletePopover}
              onClose={() => setDeletePopover(null)}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              <Typography className={classes.popover__title}>
                Are you sure you want to delete this product?
              </Typography>
              <Box className={classes.popover__buttonContainer}>
                <Button
                  onClick={() => setDeletePopover(null)}
                  className={classes.popover__button}
                >
                  Cancel
                </Button>
                <Button onClick={handleDeleteProduct} variant='contained'>
                  {loading ? <CircularProgress /> : 'Confirm'}
                </Button>
              </Box>
            </Popover>
            <Button
              className={classes.cardAction__button}
              variant='contained'
              startIcon={<DeleteIcon />}
              onClick={(e) => setDeletePopover(e.currentTarget)}
            >
              Delete
            </Button>
          </div>
        </Box>
      )}
    </CardActions>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProduct: (modal) => dispatch(editProduct(modal)),
    addProduct: (data) => dispatch(addProduct(data)),
    postProductSuccess: (boolean) => dispatch(postProductSuccess(boolean)),
    postProductFailure: (boolean) => dispatch(postProductFailure(boolean)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsCardActions);
