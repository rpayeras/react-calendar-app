import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';


export const PublicRoute = ({
    isAuthenticated,
}) => {
    return isAuthenticated ? <Navigate to="/" />  : <Outlet />   
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}
