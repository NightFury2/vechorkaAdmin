import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import { parse as parseUrl } from 'url';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import createStore from './redux/createStore';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';

import { StaticRouter } from 'react-router';
import { } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import createHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';
import routes from './routes';

const targetUrl = `http://${config.apiHost}:${config.apiPort}`;
const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true
});

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, { target: targetUrl });
});

// app.use('/ws', (req, res) => {
//   proxy.web(req, res, {target: targetUrl + '/ws'});
// });

// server.on('upgrade', (req, socket, head) => {
//   proxy.ws(req, socket, head);
// });

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }

  json = { error: 'proxy_error', reason: error.message };
  res.end(JSON.stringify(json));
});

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  const client = new ApiClient(req);
  const history = createHistory(req.originalUrl);
  const store = createStore(history, client);

  const url = req.originalUrl || req.url;
  const location = parseUrl(url);
  const helpers = { client };

  function hydrateOnClient() {
    res.send(`<!doctype html>\n${
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store} />)}`);
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  loadOnServer({ store, location, routes, helpers })
    .then(() => {
      const context = {};

      const component = (
        <Provider store={store} key="provider">
          <StaticRouter location={location} context={context}>
            <ReduxAsyncConnect routes={routes} helpers={helpers} />
          </StaticRouter>
        </Provider>
      );

      // handle redirects
      if (context.url) {
        req.header('Location', context.url);
        return res.send(302);
      }

      res.status(200);
      global.navigator = { userAgent: req.headers['user-agent'] };

      res.send(`<!doctype html>\n${
        ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />)}`);
    });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
