import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { AccountBox, Menu } from '@material-ui/icons';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useStyles } from './style';

const Navbar = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const handeSignOut = async () => {
    try {
      await Auth.signOut();
      history.push('/');
    } catch (error) {
      console.log('error signing out:', error);
    }
  };

  return (
    <div>
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge='start'
              className={classes.toolbar__menuButton}
              color='inherit'
              aria-label='menu'
            >
              <Menu />
            </IconButton>
            <Typography variant='h6' className={classes.toolbar__title}>
              <NavLink to='/' className={classes.toolbar__navLink}>
                <span className={classes.toolbar__nav}>
                  <StoreMallDirectoryIcon className={classes.toolbar__icon} />
                  Market place
                </span>
              </NavLink>
            </Typography>
            <NavLink to='/profile' className={classes.toolbar__navLink}>
              <span className={classes.toolbar__nav}>
                <AccountBox className={classes.toolbar__icon} />
                {props.userData.user.username}
              </span>
            </NavLink>
            <Button color='inherit' onClick={handeSignOut}>
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

export default connect(mapStateToProps)(Navbar);
