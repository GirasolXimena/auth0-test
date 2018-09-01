import React from 'react';
import { Route, Router } from "react-router-dom";
import Home from './Home';
import Callback from './Callback';
import Auth from './Auth';
import history from './history';

//create a new user defined instance of the Auth object type
const auth = new Auth();

//handle authentication to see where user should be routed
const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication();
    }
  }

//Set routes

const Routes = () => (
    <Router history={history} component={Home}>
      <div>
        {/* Main route that renders the home component, passing in auth and spreading props */}
        <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
        {/* this also renders home component, user is redirected here after authentication */}
        <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
        {/* /callback route renders the Callback component and runs the handleAuthentication 
            function to parse the token information from Auth0’s redirect URL. */}
            <Route path="/callback" render={(props) => {
        handleAuthentication(props);
        return <Callback {...props} />
    }}/>
      </div>
    </Router>
  );
  
  {/* All the components rendered by react-router are also passed the auth object as a prop and all the other props by Route as {…props}; they’re very helpful when you want to interact with the history. */}
  
  export default Routes;