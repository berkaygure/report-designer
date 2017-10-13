import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery-ui-dist/jquery-ui';
import 'rc-color-picker/dist/rc-color-picker.css';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import configureStore from './redux/configureStore';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const history = createHistory();
const store = configureStore(undefined, history);

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  );
};

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line
    const NextApp = require('./App').default;
    render(NextApp);
  });
}

render(App);

registerServiceWorker();
