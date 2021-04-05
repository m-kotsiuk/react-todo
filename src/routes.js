import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import List from './containers/lists/List';
import Create from './containers/lists/Create';
import Edit from './containers/lists/Edit';
import Show from './containers/lists/Show';
import Auth from './containers/auth/Auth';
import Logout from './containers/auth/Logout';

const routes = authenticated => (
    <Switch>
        <Route path="/" exact component={List} />
        {authenticated && <Route path="/list/new" exact component={Create} />}
        {authenticated && <Route path="/list/:id" exact component={Show} />}
        {authenticated && <Route path="/list/:id/edit" exact component={Edit} />}
        {!authenticated && <Route path="/auth" render={props => <Auth {...props} />} />}
        {authenticated && <Route path="/logout" exact component={Logout} />}
        <Redirect to="/" />
    </Switch>
);

export default routes;