import 'babel/polyfill';

import React from 'react';
import {
  Router,
  Route, IndexRoute
} from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/app';
import CommitListPage from './containers/commit-list-page';
import CommitPage from './containers/commit-page';

React.render(
  <Provider store={store}>
    {() => (
      <Router>
        <Route path='/' component={App}>
          <IndexRoute component={CommitListPage} />
          <Route path='commit/:sha' component={CommitPage} />
        </Route>
      </Router>
    )}
  </Provider>,
  document.body);
