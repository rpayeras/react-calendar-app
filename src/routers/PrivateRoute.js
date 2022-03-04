import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';


export const PrivateRoute = ({
    isAuthenticated,
}) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />   
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}