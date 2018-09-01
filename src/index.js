import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Routes from './Routes';

// rendering Routes instead of App. Routes is taking care of the rendering for App
ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
