import { createStore,compose } from 'redux';
import rootReducer from '../reducers';
import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import createInitialState from './initialState';

export default function configureStore() {
	const initialState = createInitialState();
	const sagaMiddleware = createSagaMiddleware();
	const composeEnhancers = typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
	  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
		// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
	  }) : compose;
	const store = createStore(rootReducer, initialState , composeEnhancers(applyMiddleware(sagaMiddleware)));
	sagaMiddleware.run(rootSaga);
	return store;
}