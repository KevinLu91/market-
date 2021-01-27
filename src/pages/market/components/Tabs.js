import React from 'react';
import { AppBar, Tabs, Tab, Typography } from '@material-ui/core';
import { Add, ShoppingCart } from '@material-ui/icons';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useStyles } from './../style';
import NewProduct from './NewProduct';
import Products from './Products';
import { tabIndex } from '../../../redux';

const TabsContainer = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.tabContainer}>
      <AppBar position='static'>
        <Tabs
          value={props.productData.tab}
          onChange={(e, newValue) => props.tabIndex(newValue)}
          variant='fullWidth'
        >
          <Tab label='Products' icon={<ShoppingCart fontSize='small' />} />
          {props.market.owner === props.userData.user.username && (
            <Tab label='Add Product' icon={<Add fontSize='small' />} />
          )}
        </Tabs>
      </AppBar>
      <div
        role='tabpanel'
        hidden={props.productData.tab !== 0}
        value={props.productData.tab}
      >
        {props.market ? (
          props.market.products.items.length > 0 ? (
            props.market.products.items.map((product) => (
              <Products key={product.id} product={product} />
            ))
          ) : (
            <Typography>No products...</Typography>
          )
        ) : (
          <CircularProgress />
        )}
      </div>

      <div
        role='tabpanel'
        hidden={props.productData.tab !== 1}
        value={props.productData.tab}
      >
        <NewProduct />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user,
    productData: state.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tabIndex: (index) => dispatch(tabIndex(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabsContainer);
