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
import { connect } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';

import { createMarket } from '../../../../../graphql/mutations';
import { handleMarketModal, addMarketName } from './../../../../../redux';
import { useStyles } from './modelStyle';
import Category from './category';

const CreateMarket = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const handleSubmit = async () => {
    setLoading(true);
    props.addMarketName(inputValue);
    try {
      const marketDetails = {
        name: inputValue,
        tags: props.marketData.selectedTags,
        owner: props.userData.user.username,
      };
      const newMarket = await API.graphql(
        graphqlOperation(createMarket, { input: marketDetails })
      );
      handleModal();
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const handleModal = () => {
    setInputValue('');
    setLoading(false);
    props.handleMarketModal();
  };

  return (
    <Modal
      className={classes.modal}
      open={props.marketData.createModal}
      onClose={handleModal}
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
              Create new market
            </Typography>
            <Typography color='textSecondary'>Add market name:</Typography>
            <TextField
              fullWidth
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </CardContent>
          <Category />
          <CardActions className={classes.modal__cardActions}>
            <Button variant='contained' onClick={handleModal}>
              Cancel
            </Button>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                variant='contained'
                color='primary'
                onClick={handleSubmit}
                disabled={inputValue ? false : true}
              >
                Create
              </Button>
            )}
          </CardActions>
        </Card>
      </Fade>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user,
    marketData: state.market,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleMarketModal: () => dispatch(handleMarketModal()),
    addMarketName: (inputValue) => dispatch(addMarketName(inputValue)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateMarket);
