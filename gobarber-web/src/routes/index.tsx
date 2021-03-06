import React from 'react';
import { Switch } from 'react-router-dom';

import SingIn from '../pages/SignIn';
import SingUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';

import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={'/'} exact component={SingIn} />
      <Route path={'/signup'} component={SingUp} />

      <Route path={'/dashboard'} component={Dashboard} isPrivate />
    </Switch>
  );
};

export default Routes;