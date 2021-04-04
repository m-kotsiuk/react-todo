import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Lists from './containers/Lists';
import Auth from './containers/auth/Auth';
import Logout from './containers/auth/Logout';

const routes = authenticated => (
    <Switch>
        <Route path="/" exact component={Lists} />
        {!authenticated && <Route path="/auth" render={props => <Auth {...props} />} />}
        {authenticated && <Route path="/logout" exact component={Logout} />}
        <Redirect to="/" />
    </Switch>
);

export default routes;