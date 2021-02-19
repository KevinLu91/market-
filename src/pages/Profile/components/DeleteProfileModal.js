import React from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  Card,
  CardContent,
  Button,
  CardActions,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ErrorOutline } from '@material-ui/icons';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deleteUser } from '../../../graphql/mutations';
import { API, graphqlOperation, Auth } from 'aws-amplify';

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

const DeleteProfileModal = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const handleDelete = async () => {
    const input = {
      id: props.userData.attributes.sub,
    };

    try {
      await API.graphql(graphqlOperation(deleteUser, { input }));
      props.setSnackSuccess(true);
      setTimeout(() => {
        props.userData.deleteUser();
        Auth.signOut();
        history.push('/');
      }, 3000);
    } catch (err) {
      console.error(err);
      props.setSnackFailed(true);
    }
    console.log(props.userData);
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
            <Typography>
              This action will permanently delete your account!
            </Typography>
            <Typography>Continue?</Typography>
          </CardContent>
          <CardActions className={classes.card__cardActions}>
            <Button onClick={() => props.setModal(false)}>Cancel</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </CardActions>
        </Card>
      </Fade>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user.user,
  };
};

export default connect(mapStateToProps)(DeleteProfileModal);
