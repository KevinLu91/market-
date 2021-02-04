import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { connect } from 'react-redux';
import { Divider, Tabs, Tab } from '@material-ui/core';
import { LocalShipping, AccountBox } from '@material-ui/icons';

import { useStyles } from './style';
import TabProfile from './components/TabProfile';
import TabOrders from './components/TabOrders';
import { getUserProfile } from '../../redux';

const fetchUser = /* GraphQL */ `
  query FetchUser($id: ID!) {
    fetchUser(id: $id) {
      id
      username
      email
      registered
      orders {
        items {
          id
          createdAt
          updatedAt
          product {
            id
            description
            price
            owner
            createdAt
          }
          shippingAddress {
            city
            country
            address_line1
            address_state
            address_zip
          }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

const Profile = (props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    API.graphql(
      graphqlOperation(fetchUser, { id: props.userData.user.attributes.sub })
    )
      .then((res) => {
        console.log(res);
        props.getUserProfile(res.data.fetchUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.container__profile}>
        <Tabs
          value={tabIndex}
          indicatorColor='primary'
          textColor='primary'
          centered
          onChange={(e, newValue) => setTabIndex(newValue)}
        >
          <Tab label='Profile' icon={<AccountBox />} />
          <Tab label='Orders' icon={<LocalShipping />} />
        </Tabs>
        <Divider className={classes.container__divider} />
        {tabIndex === 0 && <TabProfile />}
        {tabIndex === 1 && <TabOrders />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfile: (profile) => dispatch(getUserProfile(profile)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
