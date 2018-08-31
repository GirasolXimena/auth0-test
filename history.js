import createHistory from 'history/createBrowserHistory';

export default createHistory({
    basename: process.env.NODE_ENV === 'development' ? `Development URL Here` : `/reactivesearch-auth0-example`
});