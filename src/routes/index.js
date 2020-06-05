import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
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
import { useSelector } from 'react-redux';

function Private({ children, ...rest }) {
    const token = useSelector(state => state.authToken)
    return (
        <Route
            {...rest}
            render={({ location }) =>
                token !== null ? (
                    children
                ) : (
                        <Redirect to={{ pathname: "/login", state: { from: location } }} />
                    )
            }
        ></Route>
    );
}
export default () => (
    <BrowserRouter>
        <Nav />
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/gallery" component={Gallery}>
                {/* <Gallery /> */}
            </Route>
            {/* <PrivateRoute exact path="/gallery/edit" component={EditGallery} /> */}
            {/* <PrivateRoute path="/gallery/owner" component={MyGallery} /> */}
            {/* <PrivateRoute exact path="/user/profile" component={Profile} /> */}
            <Private path="/gallery/edit" component={EditGallery}>
                <EditGallery />
            </Private>
            <Private path="/gallery/owner">
                <MyGallery />
            </Private>
            <Private path="/user/profile">
                <Profile />
            </Private>
            <Route exact path="/login" >
                <Login />
            </Route>
            <Route exact path="/signup">
                <Signup />
            </Route>
            <Route path="*">
                <Redirect to={{ pathname: "/" }} />
            </Route>
        </Switch>
    </BrowserRouter>
)