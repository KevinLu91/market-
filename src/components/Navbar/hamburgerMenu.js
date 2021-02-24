import React from 'react';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import { AccountBox } from '@material-ui/icons';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { useStyles } from './style';

const HamburgerMenu = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <List className={classes.menu}>
      <ListItem
        className={classes.menu__listItem}
        onClick={() => history.push('/')}
      >
        <ListItemIcon>
          <StoreMallDirectoryIcon />
        </ListItemIcon>
        <ListItemText>Market</ListItemText>
      </ListItem>
      <ListItem
        className={classes.menu__listItem}
        onClick={() => history.push('/profile')}
      >
        <ListItemIcon>
          <AccountBox />
        </ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </ListItem>
    </List>
  );
};

export default HamburgerMenu;
