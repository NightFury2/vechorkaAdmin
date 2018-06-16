import React from 'react';
// import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
// import renderRoutes from 'react-router-config/renderRoutes';
// import { asyncConnect } from 'redux-connect';
import config from '../../config';

export default class App extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet {...config.app.head} />
        <h1>Hello App container</h1>
      </div>
    );
  }
}
