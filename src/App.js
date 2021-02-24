import React, { useEffect } from 'react';
import { API, graphqlOperation, Auth, Hub } from 'aws-amplify';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './pages/home';
import Market from './pages/market';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import { getUser, getUserCredentials, getUserProfile } from './redux';
import { createUser } from './graphql/mutations';
import { fetchUser } from './graphql/queries';
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
        registerNewUser(data.payload.data);
        break;
      case 'signUp':
        console.log('signed up');
        break;
      case 'signOut':
        props.getUser(null);
        props.getUserCredentials(null);
        props.getUserProfile('');
        break;
      case 'signIn_failure':
        props.getUser(null);
        break;
      default:
        return;
    }
  };

  const registerNewUser = async (signInData) => {
    const getUserInput = {
      id: signInData.signInUserSession.idToken.payload.sub,
    };
    const { data } = await API.graphql(
      graphqlOperation(fetchUser, getUserInput)
    );

    if (!data.fetchUser) {
      try {
        const registerUserInput = {
          ...getUserInput,
          username: signInData.username,
          email: signInData.signInUserSession.idToken.payload.email,
          registered: true,
        };
        const newUser = await API.graphql(
          graphqlOperation(createUser, { input: registerUserInput })
        );
        console.log(newUser);
      } catch (err) {
        console.error('Error registering new user', err);
      }
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
      <Route exact path='/profile' component={Profile} />
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
    getUserProfile: (profile) => dispatch(getUserProfile(profile)),
    getUser: (user) => dispatch(getUser(user)),
    getUserCredentials: (credentials) =>
      dispatch(getUserCredentials(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
