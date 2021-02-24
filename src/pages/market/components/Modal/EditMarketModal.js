import React, { useState } from 'react';
import {
  Modal,
  Typography,
  Card,
  TextField,
  CardContent,
  CardActions,
  Button,
  Backdrop,
  Fade,
  CircularProgress,
} from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';
import { connect } from 'react-redux';

import { useStyles } from '../../../home/components/Modal/CreateMarket/modelStyle';
import Category from '../../../../components/category';
import { handleMarketModal, addMarketName } from '../../../../redux';
import Success from './../../../../utility/success';
import Error from './../../../../utility/error';

export const updateMarket = /* GraphQL */ `
  mutation UpdateMarket(
    $input: UpdateMarketInput!
    $condition: ModelMarketConditionInput
  ) {
    updateMarket(input: $input, condition: $condition) {
      id
      name
      products {
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

const EditMarketModal = (props) => {
  const [inputValue, setInputValue] = useState(props.market.name);
  const [snackSuccess, setSnackSuccess] = useState(false);
  const [snackFailed, setSnackFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const handleEdit = async () => {
    setLoading(true);
    try {
      const marketDetails = {
        id: props.market.id,
        name: inputValue,
        tags: props.marketData.selectedTags,
      };
      const res = await API.graphql(
        graphqlOperation(updateMarket, { input: marketDetails })
      );

      setSnackSuccess(true);
      props.setMarket(res.data.updateMarket);
      props.handleMarketModal();

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setSnackFailed(true);
      console.error(err);
    }
  };

  const handelCloseModal = () => {
    setInputValue(props.market.name);

    props.handleMarketModal();
  };

  return (
    <>
      <Success
        message='Market Updated!'
        snackSuccess={snackSuccess}
        setSnackSuccess={setSnackSuccess}
      />
      <Error
        message='Failed, try again!'
        snackFailed={snackFailed}
        setSnackFailed={setSnackFailed}
      />
      <Modal
        className={classes.modal}
        open={props.marketData.createModal}
        onClose={handelCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.marketData.createModal}>
          <Card className={classes.modal__card}>
            <CardContent>
              <Typography
                variant='h5'
                component='h2'
                className={classes.modal__title}
              >
                Edit market {props.market.name}
              </Typography>
              <Typography color='textSecondary'>Edit market name:</Typography>
              <TextField
                fullWidth
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </CardContent>
            <Category market={props.market} />
            <CardActions className={classes.modal__cardActions}>
              <Button variant='contained' onClick={handelCloseModal}>
                Cancel
              </Button>
              {loading ? (
                <CircularProgress />
              ) : (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleEdit}
                  disabled={inputValue ? false : true}
                >
                  Edit
                </Button>
              )}
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    marketData: state.market,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleMarketModal: () => dispatch(handleMarketModal()),
    addMarketName: (name) => dispatch(addMarketName(name)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditMarketModal);
