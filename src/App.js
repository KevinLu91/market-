import React, { useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './pages/home';
import Market from './pages/market';
import Navbar from './components/Navbar';
import { getUser, getUserCredentials } from './redux';
import './App.css';

function App(props) {
  useEffect(() => {
    getUserData();
    if (props.userData) {
      getUserCredentialsData();
    }
    Hub.listen('auth', onHubCapsule);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHubCapsule = async (data) => {
    switch (data.payload.event) {
      case 'signIn':
        getUserData();
        getUserCredentialsData();
        break;
      case 'signUp':
        console.log('signed up');
        break;
      case 'signOut':
        props.getUser(null);
        props.getUserCredentials(null);
        break;
      case 'signIn_failure':
        props.getUser(null);
        break;
      default:
        return;
    }
  };

  const getUserData = async () => {
    const currentUser = await Auth.currentAuthenticatedUser();
    currentUser ? props.getUser(currentUser) : props.getUser(null);
  };

  const getUserCredentialsData = async () => {
    const credentials = await Auth.currentCredentials();
    credentials.identityId
      ? props.getUserCredentials(credentials)
      : props.getUserCredentials(null);
  };

  return !props.userData.user ? (
    <AmplifyAuthenticator />
  ) : (
    <Router>
      <Navbar />
      <Route exact path='/' component={Home} />
      <Route
        exact
        path='/market/:marketId'
        component={({ match }) => <Market marketId={match.params.marketId} />}
      />
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (user) => dispatch(getUser(user)),
    getUserCredentials: (credentials) =>
      dispatch(getUserCredentials(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
