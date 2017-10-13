import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import routeReducer from './modules';

const configureStore = (preloadedState, history) => {
  const middlewares = [thunk, routerMiddleware(history)];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger());
  }

  const composed = [applyMiddleware(...middlewares)];
  if (process.env.NODE_ENV === 'development') {
    /* eslint-disable */
    composed.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    /* eslint-enable */
  }

  const store = createStore(routeReducer, preloadedState, compose(...composed));

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./modules', () => {
      // eslint-disable-next-line
      const nextRouteReducer = require('./modules').default;
      store.replaceReducer(nextRouteReducer);
    });
  }

  return store;
};

export default configureStore;
