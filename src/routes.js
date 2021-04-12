import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ListPreviews from './pages/lists/ListPreviews';
import CreateForm from './pages/lists/CreateForm';
import CreateListItemForm from './pages/lists/CreateListItemForm';
import EditForm from './pages/lists/EditForm';
import EditListItemForm from './pages/lists/EditListItemForm';
import SingleList from './pages/lists/SingleList';
import Auth from './pages/auth/Auth';
import Logout from './pages/auth/Logout';

const routes = authenticated => (
    authenticated ? 
    (
        <Switch> 
            <Route path="/" exact component={ListPreviews} />
            <Route path="/list/new" exact component={CreateForm} />                  
            <Route path="/list/:id" exact component={SingleList} />
            <Route path="/list/:id/edit" exact component={EditForm} />
            <Route path="/list/:id/create-item" exact component={CreateListItemForm} />
            <Route path="/list/:id/edit/:itemId" exact component={EditListItemForm} />
            <Route path="/logout" exact component={Logout} />
            <Redirect to="/" />
        </Switch>
    )
    :
    (
        <Switch> 
            <Route path="/auth" exact render={props => <Auth {...props} />} />
            <Redirect to="/auth" />
        </Switch>
    )

);

export default routes;

