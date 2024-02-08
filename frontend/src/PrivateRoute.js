import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
   const isAuthenticated = () => {
     return localStorage.getItem('token') ? true : false;
  };

  return (
        isAuthenticated() ? (
          <Component />
        ) : (
          <Navigate to="/login" replace />
        )
  );
};

export default PrivateRoute;
