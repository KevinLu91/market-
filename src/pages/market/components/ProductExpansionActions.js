import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  Typography,
  Button,
  AccordionActions,
  Divider,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';

import DeleteMarketModal from './Modal/DeleteMarketModal';
import Success from './../../../utility/success';
import Error from './../../../utility/error';
import EditMarketModal from './Modal/EditMarketModal';
import { handleMarketModal } from '../.././../redux';

const ProductExpansionActions = (props) => {
  const [modal, setModal] = useState(false);
  const [snackFailed, setSnackFailed] = useState(false);
  const [snackSuccess, setSnackSuccess] = useState(false);

  return (
    <div>
      <Success
        message='Market Deleted!'
        snackSuccess={snackSuccess}
        setSnackSuccess={setSnackSuccess}
      />
      <Error
        message='Failed, try again!'
        snackFailed={snackFailed}
        setSnackFailed={setSnackFailed}
      />
      <DeleteMarketModal
        modal={modal}
        setModal={setModal}
        market={props.market}
        setSnackSuccess={setSnackSuccess}
        setSnackFailed={setSnackFailed}
      />
      <EditMarketModal market={props.market} setMarket={props.setMarket} />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Market Actions</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionActions>
          <Button
            size='small'
            variant='contained'
            onClick={() => props.handleMarketModal()}
          >
            Edit
          </Button>
          <Button
            size='small'
            variant='contained'
            onClick={() => setModal(true)}
          >
            Delete Market{' '}
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleMarketModal: () => dispatch(handleMarketModal()),
  };
};

export default connect(null, mapDispatchToProps)(ProductExpansionActions);
