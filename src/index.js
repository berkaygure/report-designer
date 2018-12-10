import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './css/App.css';
import App from './App';
import './i18n';
import { Provider } from 'react-redux';
import store from './redux/store';

// eslint-disable-next-line no-undef
ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
