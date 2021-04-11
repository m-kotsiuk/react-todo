import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ListPreviews from './containers/lists/ListPreviews';
import CreateForm from './containers/lists/CreateForm';
import CreateListItemForm from './containers/lists/CreateListItemForm';
import EditForm from './containers/lists/EditForm';
import EditListItemForm from './containers/lists/EditListItemForm';
import SingleList from './containers/lists/SingleList';
import Auth from './containers/auth/Auth';
import Logout from './containers/auth/Logout';

const routes = authenticated => (
    <Switch>
        <Route path="/" exact component={ListPreviews} />
        {
            authenticated ? 
            (
                <Switch> 
                    <Route path="/list/new" exact component={CreateForm} />                  
                    <Route path="/list/:id" exact component={SingleList} />
                    <Route path="/list/:id/edit" exact component={EditForm} />
                    <Route path="/list/:id/create-item" exact component={CreateListItemForm} />
                    <Route path="/list/:id/edit/:itemId" exact component={EditListItemForm} />
                    <Route path="/logout" exact component={Logout} />
                </Switch>
            )
            :
            (
                <Route path="/auth" render={props => <Auth {...props} />} />
            )
        }
        <Redirect to="/" />
    </Switch>
);

export default routes;

