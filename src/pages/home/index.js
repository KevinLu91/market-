import React from 'react';

import NewMarket from './components/NewMarket';
import { useStyles } from './style';

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <NewMarket />
    </div>
  );
};

export default Home;
