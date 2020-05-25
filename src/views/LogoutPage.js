import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { routes } from 'routes';
const LogoutPage = () => {
    localStorage.removeItem('userID');
    localStorage.removeItem('token');
        
        return <Redirect to={routes.login} />;
      
};

export default LogoutPage;

