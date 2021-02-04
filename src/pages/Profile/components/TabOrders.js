import React from 'react';
import { Card, Typography } from '@material-ui/core';

import { useStyles } from '../style';

const TabOrders = () => {
  const classes = useStyles();
  return (
    <div className={classes.tabContainer}>
      <h3>ORDER HISTORY</h3>
      <Card className={classes.card}>
        <Typography>hej</Typography>
      </Card>
    </div>
  );
};

export default TabOrders;
