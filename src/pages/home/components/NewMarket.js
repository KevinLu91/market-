import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Box,
  Typography,
} from '@material-ui/core';
import StoreMallDirectoryOutlinedIcon from '@material-ui/icons/StoreMallDirectoryOutlined';
import { connect } from 'react-redux';

import { handleMarketModal } from './../../../redux';
import { useStyles } from '../style';
import CreateMarket from '../components/Modal/CreateMarket';

const NewMarket = (props) => {
  const classes = useStyles();
  return (
    <div>
      <CreateMarket />
      <Card className={classes.card} onClick={props.handleMarketModal}>
        <CardContent>
          <Typography
            variant='h5'
            component='h2'
            className={classes.card__title}
          >
            Create market
          </Typography>
        </CardContent>
        <CardActions>
          <Box size='small'>
            <StoreMallDirectoryOutlinedIcon />
          </Box>
        </CardActions>
      </Card>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleMarketModal: () => dispatch(handleMarketModal()),
  };
};

export default connect(null, mapDispatchToProps)(NewMarket);
