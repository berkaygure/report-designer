import { createStore, applyMiddleware, compose } from 'redux';
import rootReducers from './reducers';
import thunk from 'redux-thunk';

const initialState = {};

const middleware = [thunk];

let allEnhancers;

if (process.env.NODE_ENV === 'development') {
  allEnhancers = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  allEnhancers = compose(applyMiddleware(...middleware));
}
const store = createStore(rootReducers, initialState, allEnhancers);

export default store;
