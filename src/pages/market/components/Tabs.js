import React, { useState } from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { Add, ShoppingCart } from '@material-ui/icons';
import { connect } from 'react-redux';

import { useStyles } from './../style';
import NewProduct from './NewProduct';
import Products from './Products';

const TabsContainer = (props) => {
  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles();

  const handleChangeTab = (e, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className={classes.tabContainer}>
      <AppBar position='static'>
        <Tabs value={tabValue} onChange={handleChangeTab} variant='fullWidth'>
          <Tab label='Products' icon={<ShoppingCart fontSize='small' />} />
          {props.market.owner === props.userData.user.username && (
            <Tab label='Add Product' icon={<Add fontSize='small' />} />
          )}
        </Tabs>
      </AppBar>
      <div role='tabpanel' hidden={tabValue !== 0} value={tabValue}>
        <Products />
      </div>
      <div role='tabpanel' hidden={tabValue !== 1} value={tabValue}>
        <NewProduct />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

export default connect(mapStateToProps)(TabsContainer);
