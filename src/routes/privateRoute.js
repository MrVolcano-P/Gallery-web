import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = useSelector(state => state.authToken)
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            token === null || token === undefined ?
                <Redirect to="/login" />
                :
                <Component {...props} />
        )} />
    );
};

export default PrivateRoute;