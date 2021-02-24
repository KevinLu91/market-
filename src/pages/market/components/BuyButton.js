import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
import { Button, CircularProgress } from '@material-ui/core';

import { fetchUser } from '../../../graphql/queries';
import { createOrder } from '../../../graphql/mutations';

const stripeConfig = {
  currency: 'EUR',
  publishableAPIKey:
    'pk_test_51IGTh8L1EofZdk15ugjN4JNQWp2sTSPARXaS3Jvs1AWej6TZn4ls8NqqzDFkxcu6DsGNCAwydOjvKpxHTQPGzr3A00m6ogpbJk',
};

const BuyButton = (props) => {
  const [loading, setLoading] = useState(false);

  const getOwnerEmail = async (id) => {
    try {
      return await API.graphql(graphqlOperation(fetchUser, { id }));
    } catch (err) {
      console.error('Error fetching prodct owner  email', err);
    }
  };

  const createShippingAddress = (source) => ({
    city: source.address_city,
    country: source.address_country,
    address_line1: source.address_line1,
    address_state: source.address_state,
    address_zip: source.address_zip,
  });

  const handleCharge = async (token) => {
    try {
      setLoading(true);
      const ownerEmail = await getOwnerEmail(props.product.owner);
      console.log(ownerEmail);
      const result = await API.post('orderlambda', '/charge', {
        body: {
          token,
          charge: {
            currency: stripeConfig.currency,
            amount: props.product.price,
            description: props.product.description,
          },
          email: {
            customerEmail: props.userData.username,
            ownerEmail: ownerEmail.data.fetchUser.username,
            shipped: props.product.shipped,
          },
        },
      });
      if (result.charge.status === 'succeeded') {
        let shippingAddress = null;
        if (props.product.shipped) {
          shippingAddress = createShippingAddress(result.charge.source);
        }
        const input = {
          orderProductId: props.product.id,
          orderUserId: props.userData.attributes.sub,
          shippingAddress,
        };
        const order = await API.graphql(
          graphqlOperation(createOrder, { input })
        );
        console.log(order);
        props.setSnackSuccess(true);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      props.setSnackFailed(true);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Button>
          <CircularProgress />
        </Button>
      ) : (
        <StripeCheckout
          token={handleCharge}
          currency={stripeConfig.currency}
          stripeKey={stripeConfig.publishableAPIKey}
          amount={props.product.price * 100}
          name={props.product.description}
          email={props.userData.username}
          shippingAddress={props.product.shipped}
          billingAddress={props.product.shipped}
          locale='auto'
          allowRememberMe={false}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user.user,
  };
};

export default connect(mapStateToProps)(BuyButton);
