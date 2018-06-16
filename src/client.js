/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/createStore';
import ApiClient from './helpers/ApiClient';
import { Provider } from 'react-redux';
// import { Router } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ReduxAsyncConnect } from 'redux-connect';
// import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { routes } from './routes';

const client = new ApiClient();
const _browserHistory = createBrowserHistory();
const dest = document.getElementById('content');
const store = createStore(_browserHistory, client, window.__data);
// const history = syncHistoryWithStore(_browserHistory, store);

const component = (
  <BrowserRouter>
    <ReduxAsyncConnect routes={routes} helpers={{ client }} />
  </BrowserRouter>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </ Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./Containers/DevTools/DevTools');// eslint-disable-line global-require
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
