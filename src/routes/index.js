import React from 'react'
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import nav from '../nav';
import Gallery from '../pages/Gallery';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
export default () => (
    <BrowserRouter>
        <Route path="/" component={nav} />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/gallery/:id" component={Gallery} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
        </Switch>
    </BrowserRouter>
)