import * as React from 'react';
const { Switch, Route } = require('react-router');
import HomePage from './Home';

export default () => (
  <HomePage>
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  </HomePage>
);
