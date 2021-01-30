import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Typography, Paper } from '@material-ui/core';
import { Add, ShoppingCart } from '@material-ui/icons';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useStyles } from './../style';
import NewProduct from './NewProduct';
import Products from './Products';
import EditModal from '../components/Modal/EditModal';

const TabsContainer = (props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();

  return (
    <div className={classes.tabContainer}>
      <AppBar position='static'>
        <Tabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          variant='fullWidth'
        >
          <Tab label='Products' icon={<ShoppingCart fontSize='small' />} />
          {props.market.owner === props.userData.user.username && (
            <Tab label='Add Product' icon={<Add fontSize='small' />} />
          )}
        </Tabs>
      </AppBar>
      <div role='tabpanel' hidden={tabIndex !== 0} value={tabIndex}>
        <Paper className={classes.tabContainer__paper}>
          {props.market ? (
            props.market.products.items.length > 0 ? (
              props.market.products.items.map((product) => (
                <Products key={product.id} product={product} />
              ))
            ) : (
              <Typography>No products...</Typography>
            )
          ) : (
            <div className={classes.tabContainer__loading}>
              <CircularProgress />
            </div>
          )}
        </Paper>
      </div>
      <div role='tabpanel' hidden={tabIndex !== 1} value={tabIndex}>
        <NewProduct />
      </div>
      <EditModal />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user,
    productData: state.product,
  };
};

export default connect(mapStateToProps)(TabsContainer);
