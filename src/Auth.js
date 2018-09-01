import auth0 from 'auth0-js';
import history from './history';

export default class Auth {

    auth0 = new auth0.WebAuth({
        domain: 'translatio.auth0.com',
        clientID: 'A3snSPBooHH0X9RPBTZ0Uq4G4yaM5Kw0',
        redirectUri:'http://localhost:3000/callback',
        audience: `https://translatio.auth0.com/userinfo`,
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
                console.log(authResult);
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
        console.log('setting session');
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        console.log('going home', localStorage);
        
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
        console.log(`expires at:`, expiresAt);
        
        return new Date().getTime() < expiresAt;
    }
}