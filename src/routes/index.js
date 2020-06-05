import React from 'react'
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Nav from '../nav';
import Gallery from '../pages/Gallery';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import EditGallery from '../pages/EditGallery';
import MyGallery from '../pages/MyGallery';
import PrivateRoute from './privateRoute';
import Profile from '../Profile'
export default () => (
    <BrowserRouter>
        <Nav />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/gallery/:id" component={Gallery} />
            <PrivateRoute exact path="/gallery/:id/edit" component={EditGallery} />
            <PrivateRoute exact path="/gallery/owner/all" component={MyGallery} />
            <PrivateRoute exact path="/user/profile" component={Profile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
        </Switch>
    </BrowserRouter>
)