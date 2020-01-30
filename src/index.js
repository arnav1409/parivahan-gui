import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import configStore from './store/configureStore';
import { appAction } from './actions';
import './index.scss';

// This is common redux store
const store = configStore();

//get the API URL and save it into a global 'CONFIG' object
let configFilePath = '/config.json';

if (process.env.NODE_ENV === 'development') {
	configFilePath = '/config.dev.json';
}

axios.get(configFilePath)
.then(res => {
	store.dispatch(appAction.configLoaded(res.data));
	ReactDOM.render(
		<Provider store={store} >
			<App />
		</Provider>,
	document.getElementById('root'));
})
.catch(err => {
	console.log('Error reading config.json');
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
