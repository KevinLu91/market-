import React, { useEffect } from 'react';
import { AmplifyS3Image } from '@aws-amplify/ui-react';
import { Card, Paper, Typography, Box } from '@material-ui/core';
import { LocalShipping, Mail } from '@material-ui/icons';

import { getProduct } from '../../../graphql/queries';

const Products = (props) => {
  console.log(props.product);
  // useEffect(() => {
  //   console.log(props.productId);
  //   API.graphql(
  //     graphqlOperation(getProduct, {
  //       id: 'f7b7857a-a955-4f3e-8e06-0f034185e16c',
  //     })
  //   )
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <Paper>
      <Card>
        <AmplifyS3Image imgKey={props.product.file.key} />
        <Typography variant='h5'>{props.product.description}</Typography>
        <Box>
          {props.product.shipped ? (
            <Box>
              <LocalShipping />
              <Typography>Shipped</Typography>
            </Box>
          ) : (
            <Box>
              <Mail />
              <Typography>Mailed</Typography>
            </Box>
          )}
        </Box>
        <Typography>{props.product.price}€</Typography>
      </Card>
    </Paper>
  );
};

export default Products;
