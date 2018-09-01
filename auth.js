import auth0 from 'auth0-js';
import history from './history';

export default class Auth {

    auth0 = new auth0.WebAuth({
        domain: 'translatio.auth0.com',
        clientID: 'zynPjqr39a03xbu64CfMTUXRfnv5Ltkn',
        redirectUri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/callback' : '',
        audience: `http://translatio.auth0.com/userinfo`,
        responseType: `token id_token`,
        scope: 'openid',

    })

    login = () => {
        this.auth0.authorize();
    }

    //parse result from URL hash
    handleAuthentication = () => {
        this.auth0.parseHash(( err, authResult ) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                history.replace('/home');
            } else if (err) {
                history.replace('/home');
                console.error(err);
                
            }
        })
    }

    //set user details in local storage
    setSession = (authResult) => {
        //set time for JSON token to expire
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime);
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        //navigate home
        history.replace('/home');
    }

    //remove user details from local storage
    logout = () => {
        //clear access token and ID token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        //then navigate home
        history.replace('/home');
    }

    //check if user is authenticated
    isAuthenticated = () => {
        //check whether current time is 
        //after the access expires time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
}