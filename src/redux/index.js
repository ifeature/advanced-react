import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import reducer from './reducer';
import history from '../history';

// let composeEnhancers = compose;
let composeEnhancers = composeWithDevTools;
const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, routerMiddleware(history), thunk, logger];

// if (process.env.NODE_ENV === 'development') {
//     import('redux-logger').then(({ createLogger }) => {
//         const logger = createLogger();
//         middlewares.push(logger);
//     });
//
//     import('redux-devtools-extension').then(({ composeWithDevTools}) => {
//         composeEnhancers = composeWithDevTools;
//     });
// }

const enhancer = composeEnhancers(applyMiddleware(...middlewares));
const store = createStore(reducer, enhancer);
window.store = store;

sagaMiddleware.run(rootSaga);

export default store;
