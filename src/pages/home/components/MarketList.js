import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Card, Box, Chip } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { connect } from 'react-redux';

import { listMarkets } from '../../../graphql/queries';
import { onCreateMarket } from '../../../graphql/subscriptions';
import { useStyles } from './MarketListStyle';
import { Done } from '@material-ui/icons';

const MarketList = (props) => {
  const [marketList, setMarketList] = useState([]);
  const [newMarket, setNewMarket] = useState('');
  let subscriptionOnCreate;
  let renderList =
    props.searchData.searchResults.length > 0
      ? props.searchData.searchResults
      : marketList;
  const classes = useStyles();

  useEffect(() => {
    API.graphql(graphqlOperation(listMarkets))
      .then((res) => {
        console.log(res.data.listMarkets.items);
        setMarketList(res.data.listMarkets.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newMarket]);

  useEffect(() => {
    subscriptionMarketList();

    return () => {
      subscriptionOnCreate.unsubscribe();
    };
  });

  const subscriptionMarketList = async () => {
    subscriptionOnCreate = await API.graphql(
      graphqlOperation(onCreateMarket)
    ).subscribe({
      next: (marketData) => {
        setNewMarket(marketData);
      },
    });
  };

  return (
    <div className={classes.container}>
      {props.searchData.searchResults.length > 0 ? (
        <div>
          <Done />
          {props.searchData.searchResults.length}{' '}
        </div>
      ) : (
        <p>MarketList</p>
      )}
      {marketList.length > 0 ? (
        renderList.map((market) => (
          <Card key={market.id} className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Box className={classes.cardContent__info}>
                <Box className={classes.cardContent__titleContainer}>
                  <Typography
                    className={classes.cardContent__title}
                    variant='h5'
                    component='h2'
                  >
                    {market.name}
                  </Typography>
                  <Typography className={classes.cardContent__product}>
                    {market.products.length > 0 ? market.products.length : 0}
                  </Typography>
                  <ShoppingCart />
                </Box>
                <Typography color='textSecondary'>{market.owner}</Typography>
              </Box>
              <Box className={classes.cardContent__tags}>
                {market.tags.length > 0 &&
                  market.tags.map((tag) => (
                    <div key={tag} className={classes.cardContent__tag}>
                      <Chip label={tag} />
                    </div>
                  ))}
              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No market avalible..</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    searchData: state.search,
  };
};

export default connect(mapStateToProps)(MarketList);
