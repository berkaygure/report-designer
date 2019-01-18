// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGavel,
  faBuilding,
  faEnvelope,
  faPhone,
  faCalendarAlt,
  faTrash,
  faAlignLeft,
  faAlignCenter,
  faAlignRight
} from '@fortawesome/free-solid-svg-icons';

import store from './redux/store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './i18n';
import './css/App.css';

library.add(faGavel);
library.add(faBuilding);
library.add(faEnvelope);
library.add(faPhone);
library.add(faCalendarAlt);
library.add(faTrash);
library.add(faAlignLeft);
library.add(faAlignCenter);
library.add(faAlignRight);

// eslint-disable-next-line no-undef
const root = document.getElementById('root');

if (root !== null) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  );
}

registerServiceWorker();
