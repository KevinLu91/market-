import React from 'react';
import { Card, Typography, Box } from '@material-ui/core';
import { connect } from 'react-redux';

import { useStyles } from '../style';

const TabOrders = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.tabContainer}>
      <h3>ORDER HISTORY</h3>
      {props.profileData.orders.items.length > 0 ? (
        props.profileData.orders.items.map((item) => (
          <Card className={classes.orderCard} key={item.id}>
            <Typography className={classes.orderCard__typograpphy}>
              Ordernumber: {item.id}
            </Typography>
            <Typography className={classes.orderCard__typograpphy}>
              Product Description: {item.product.description}
            </Typography>
            <Typography className={classes.orderCard__typograpphy}>
              Price: {item.product.price}€
            </Typography>
            <Typography className={classes.orderCard__typograpphy}>
              Purchased on: {item.createdAt}
            </Typography>
            {item.shippingAddress ? (
              <Box>
                <Typography className={classes.orderCard__typograpphy}>
                  ShippingAddress:
                </Typography>
                <Typography
                  className={`${classes.orderCard__typograpphy}--shipped`}
                >
                  {item.shippingAddress.address_line1}
                </Typography>
                <Typography
                  className={`${classes.orderCard__typograpphy}--shipped`}
                >
                  {item.shippingAddress.address_zip},{' '}
                  {item.shippingAddress.city}
                </Typography>
                <Typography
                  className={`${classes.orderCard__typograpphy}--shipped`}
                >
                  {item.shippingAddress.country}
                </Typography>
              </Box>
            ) : (
              <Typography
                className={`${classes.orderCard__typograpphy}--emailed`}
              >
                Emailed
              </Typography>
            )}
          </Card>
        ))
      ) : (
        <Card className={classes.orderCard}>
          <Typography>No orders...</Typography>
        </Card>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profileData: state.user.profile,
  };
};

export default connect(mapStateToProps)(TabOrders);
