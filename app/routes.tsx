import * as React from 'react';
import { Switch, Route } from 'react-router';
import HomePage from './Home';

export default () => (
  <HomePage>
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  </HomePage>
);
