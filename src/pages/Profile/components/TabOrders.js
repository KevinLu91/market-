import React, { useState } from 'react';
import { Card, Typography, Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { parseISO } from 'date-fns';
import Pagination from '@material-ui/lab/Pagination';

import { useStyles } from '../style';
import { formatOrderDate } from '../../../utility';

const TabOrders = (props) => {
  const [activePage, setActivePage] = useState(1);
  const classes = useStyles();
  const ordersPerPage = 2;
  const indexOfLastOrder = activePage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = props.profileData.orders.items.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  return (
    <div className={classes.tabContainer}>
      <h3>ORDER HISTORY</h3>
      {props.profileData.orders.items.length > 0 ? (
        currentOrders.map((item) => (
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
              Purchased on: {formatOrderDate(parseISO(item.createdAt))}
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
      <div>
        <Pagination
          count={Math.ceil(
            props.profileData.orders.items.length / ordersPerPage
          )}
          page={activePage}
          onChange={(e, value) => setActivePage(value)}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profileData: state.user.profile,
  };
};

export default connect(mapStateToProps)(TabOrders);
