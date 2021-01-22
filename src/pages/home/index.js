import React from 'react';
import MarketList from './components/MarketList';

import NewMarket from './components/NewMarket';
import { useStyles } from './style';

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <NewMarket />
      <MarketList />
    </div>
  );
};

export default Home;
