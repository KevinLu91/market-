import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Box,
  Typography,
} from '@material-ui/core';
import StoreMallDirectoryOutlinedIcon from '@material-ui/icons/StoreMallDirectoryOutlined';

import { useStyles } from '../style';
import CreateMarket from '../components/Modal/CreateMarket';

const NewMarket = () => {
  const [create, setCreate] = useState(false);

  const classes = useStyles();
  return (
    <div>
      <CreateMarket create={create} setCreate={setCreate} />
      <Card className={classes.card} onClick={() => setCreate(true)}>
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

export default NewMarket;
