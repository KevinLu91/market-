import React from 'react';
import { connect } from 'react-redux';
import {
  Radio,
  Modal,
  TextField,
  Typography,
  Box,
  Button,
  Fade,
  Backdrop,
  FormControlLabel,
} from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';

import {
  addProduct,
  editProduct,
  editProductDescription,
  editProductShipped,
  editProductPrice,
} from '../../../../redux';
import { updateProduct } from '../../../../graphql/mutations';
import { blockInvalidChar } from '../../../../utility/blockInvalidChar';
import { useStyles } from './EditModalStyle';

const EditModal = (props) => {
  const classes = useStyles();

  const handleUpdate = async () => {
    const input = {
      id: props.productData.addProduct.id,
      description: props.productData.addProduct.description,
      price: props.productData.addProduct.price,
      shipped: props.productData.addProduct.shipped,
    };

    const res = await API.graphql(graphqlOperation(updateProduct, { input }));
    console.log(res);
  };

  const handleCloseEdit = () => {
    props.addProduct({});
    props.editProduct(false);
  };

  return (
    <Modal
      className={classes.modal}
      open={props.productData.editProduct}
      onClose={handleCloseEdit}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.productData.editProduct}>
        <div className={classes.paper}>
          <Typography variant='h4'>Update Product</Typography>
          <TextField
            className={classes.paper__field}
            fullWidth
            variant='outlined'
            label='Update Description'
            defaultValue={props.productData.addProduct.description}
            onChange={(e) => props.editProductDescription(e.target.value)}
          />
          <TextField
            className={classes.paper__field}
            fullWidth
            type='number'
            variant='outlined'
            label='Update Price'
            onKeyDown={blockInvalidChar}
            defaultValue={props.productData.addProduct.price}
            onChange={(e) => props.editProductPrice(e.target.value)}
          />
          <Box className={`${classes.paper__field}--radios`}>
            <Box>
              <Typography>Update Shipping</Typography>
              <FormControlLabel
                control={
                  <Radio
                    checked={props.productData.addProduct.shipped === true}
                    onChange={() =>
                      props.editProductShipped(
                        !props.productData.addProduct.shipped
                      )
                    }
                  />
                }
                label='Shipped'
                labelPlacement='end'
              />
              <FormControlLabel
                control={
                  <Radio
                    label='Mailed'
                    checked={props.productData.addProduct.shipped === false}
                    onChange={() =>
                      props.editProductShipped(
                        !props.productData.addProduct.shipped
                      )
                    }
                  />
                }
                label='Mailed'
                labelPlacement='end'
              />
            </Box>
          </Box>
          <Box className={`${classes.paper__field}--buttons`}>
            <Box>
              <Button onClick={handleCloseEdit} variant='contained'>
                Cancel
              </Button>
              <Button
                className={classes.paper_button}
                onClick={handleUpdate}
                variant='contained'
              >
                Edit
              </Button>
            </Box>
          </Box>
        </div>
      </Fade>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    productData: state.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProduct: (modal) => dispatch(editProduct(modal)),
    addProduct: (data) => dispatch(addProduct(data)),
    editProductShipped: (shipped) => dispatch(editProductShipped(shipped)),
    editProductPrice: (price) => dispatch(editProductPrice(price)),
    editProductDescription: (description) =>
      dispatch(editProductDescription(description)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
