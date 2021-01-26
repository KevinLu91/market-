import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { Typography, Box } from '@material-ui/core';
import { Event } from '@material-ui/icons';

import { getMarket } from '../../graphql/queries';
import { useStyles } from './style';
import TabsContainer from './components/Tabs';

const Market = (props) => {
  const [market, setMarket] = useState('');
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    API.graphql(graphqlOperation(getMarket, { id: props.marketId }))
      .then((res) => {
        console.log(res.data.getMarket);
        setMarket(res.data.getMarket);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.marketId]);

  return (
    <div className={classes.container}>
      <div className={classes.container__market}>
        <Typography
          onClick={() => history.push('/')}
          className={classes.container__link}
        >
          Back to market list
        </Typography>
        <Box className={classes.container__Box}>
          <Typography variant='h4' className={classes.container__firstElem}>
            {market.name}
          </Typography>
          <Typography className={classes.container__secondElem}>-</Typography>
          <Typography>{market.id}</Typography>
        </Box>

        <Box className={classes.container__Box}>
          <Event className={classes.container__firstElem} />
          <Typography>{market.createdAt}</Typography>
        </Box>
      </div>
      <TabsContainer market={market} />
    </div>
  );
};

export default Market;
