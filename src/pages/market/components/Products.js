import React from 'react';
import { AmplifyS3Image } from '@aws-amplify/ui-react';
import {
  Card,
  Typography,
  Box,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import { LocalShipping, Mail } from '@material-ui/icons';

import { useStyles } from './ProductsStyle';
import ProductsCardActions from './ProductsCardActions';

const Products = (props) => {
  const classes = useStyles();

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
        <ProductsCardActions product={props.product} />
      </CardContent>
    </Card>
  );
};

export default Products;
