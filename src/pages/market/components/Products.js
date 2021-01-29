import React from 'react';
import { AmplifyS3Image } from '@aws-amplify/ui-react';
import {
  Card,
  Typography,
  Box,
  CardMedia,
  CardContent,
  Button,
  CardActions,
} from '@material-ui/core';
import { LocalShipping, Mail } from '@material-ui/icons';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

import { useStyles } from './ProductsStyle';
import { editProduct, addProduct } from '../../../redux';

const Products = (props) => {
  const classes = useStyles();

  const handleEdit = () => {
    props.addProduct(props.product);
    props.editProduct(true);
  };
  return (
    <Card className={classes.card}>
      <CardMedia>
        <AmplifyS3Image
          imgKey={props.product.file.key}
          style={{ '--width': '99%', '--heigt': '100vh' }}
        />
      </CardMedia>
      <CardContent>
        <Typography variant='h4' className={classes.card___title}>
          {props.product.description}
        </Typography>
        <Box className={classes.card___info}>
          {props.product.shipped ? (
            <Box className={classes.card___shippInfo}>
              <LocalShipping className={classes.card__icon} />
              <Typography>Shipped</Typography>
            </Box>
          ) : (
            <Box className={classes.card___shippInfo}>
              <Mail className={classes.card__icon} />
              <Typography>Mailed</Typography>
            </Box>
          )}
          <Typography className={classes.card___price}>
            {props.product.price}€
          </Typography>
        </Box>
        <CardActions className={classes.card__cardAction}>
          {props.product.owner !== props.userData.user.attributes.sub ? (
            <Button variant='contained' startIcon={<CreateIcon />}>
              Buy
            </Button>
          ) : (
            <Box>
              <Button variant='contained' onClick={handleEdit}>
                Edit
              </Button>
              <Button
                className={classes.card__button}
                variant='contained'
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Box>
          )}
        </CardActions>
      </CardContent>
    </Card>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
