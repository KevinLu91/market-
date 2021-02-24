import React, { useState } from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  Card,
  CardContent,
  Button,
  CardActions,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ErrorOutline } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import { deleteMarket } from '../../../../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  card__title: {
    display: 'flex',
    alignItems: 'center',
  },
  card__cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  card__icon: {
    marginRight: '0.5rem',
  },
}));

const DeleteMarketModal = (props) => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const handleDelete = async () => {
    setLoading(true);
    const input = {
      id: props.market.id,
    };

    try {
      await API.graphql(graphqlOperation(deleteMarket, { input }));
      props.setSnackSuccess(true);
      setTimeout(() => {
        setLoading(false);
        history.push('/');
      }, 3000);
    } catch (err) {
      setLoading(false);
      console.error(err);
      props.setSnackFailed(true);
    }
  };

  return (
    <Modal
      className={classes.modal}
      open={props.modal}
      onClose={() => props.setModal(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.modal}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant='h5' className={classes.card__title}>
              <ErrorOutline className={classes.card__icon} /> Attention!
            </Typography>
            <Typography>This market will be permanently removed!</Typography>
            <Typography>Continue?</Typography>
          </CardContent>
          <CardActions className={classes.card__cardActions}>
            <Button onClick={() => props.setModal(false)}>Cancel</Button>
            <Button onClick={handleDelete}>
              {loading ? <CircularProgress /> : 'DELETE'}
            </Button>
          </CardActions>
        </Card>
      </Fade>
    </Modal>
  );
};

export default DeleteMarketModal;
