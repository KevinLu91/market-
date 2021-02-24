import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { Typography, Box, Button } from '@material-ui/core';
import { Event } from '@material-ui/icons';
import { connect } from 'react-redux';

import { useStyles } from './style';
import TabsContainer from './components/Tabs';
import {
  onCreateProduct,
  onUpdateProduct,
  onDeleteProduct,
} from '../../graphql/subscriptions';
import ProductExpansionActions from './components/ProductExpansionActions';
import { formatProductDate } from '../../utility';

export const getMarket = /* GraphQL */ `
  query GetMarket($id: ID!) {
    getMarket(id: $id) {
      id
      name
      products(sortDirection: DESC) {
        items {
          id
          description
          price
          shipped
          owner
          file {
            key
            bucket
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      tags
      owner
      createdAt
      updatedAt
    }
  }
`;

const Market = (props) => {
  const [market, setMarket] = useState('');
  const [newProdct, setNewProduct] = useState('');
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    let mounted = true;
    API.graphql(graphqlOperation(getMarket, { id: props.marketId }))
      .then((res) => {
        if (mounted) {
          console.log(res.data.getMarket);
          setMarket(res.data.getMarket);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return function cleanUp() {
      mounted = false;
    };
  }, [props.marketId, newProdct]);

  useEffect(() => {
    let mounted = true;
    let subscription = API.graphql(graphqlOperation(onCreateProduct)).subscribe(
      {
        next: (productData) => {
          if (mounted) {
            setNewProduct(productData);
          }
        },
        error: (error) => {
          console.warn(error);
        },
      }
    );

    return function cleanUp() {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    let subscription = API.graphql(graphqlOperation(onUpdateProduct)).subscribe(
      {
        next: (productData) => {
          if (mounted) {
            setNewProduct(productData);
          }
        },
        error: (error) => {
          console.warn(error);
        },
      }
    );

    return function cleanUp() {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    let subscription = API.graphql(graphqlOperation(onDeleteProduct)).subscribe(
      {
        next: (productData) => {
          if (mounted) {
            setNewProduct(productData);
          }
        },
        error: (error) => {
          console.warn(error);
        },
      }
    );

    return function cleanUp() {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.container__market}>
        <Button
          onClick={() => history.push('/')}
          className={classes.container__link}
          variant='contained'
        >
          Back to market list
        </Button>
        <Box className={classes.container__Box}>
          <Typography variant='h4' className={classes.container__firstElem}>
            {market.name}
          </Typography>
          <Typography className={classes.container__secondElem}>-</Typography>
          <Typography>{market.id}</Typography>
        </Box>
        <Box className={classes.container__Box}>
          <Event className={classes.container__firstElem} />
          <Typography>{formatProductDate(market.createdAt)}</Typography>
        </Box>
        {market.owner === props.userData.username && (
          <ProductExpansionActions market={market} setMarket={setMarket} />
        )}
      </div>
      <TabsContainer market={market} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user.user,
  };
};

export default connect(mapStateToProps)(Market);
