import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import { makeStyles } from '@material-ui/core/styles';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    alignContent: 'center',
  },
}));

const Navbar = (props) => {
  const classes = useStyles();

  const handeSignOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out:', error);
    }
  };

  //lägg till användarens namn to /profile

  return (
    <div>
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              <NavLink to='/'>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <StoreMallDirectoryIcon />
                  Market place
                </span>
              </NavLink>
            </Typography>
            <Typography>{props.userData.user.username}</Typography>
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
