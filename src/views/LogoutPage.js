import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { routes } from 'routes';
import {clearMessage as clearMessageAction, logout as logoutAction} from 'actions';
import { connect } from 'react-redux';


const LogoutPage = ({clearMessage, logout}) => {
    localStorage.removeItem('userID');
    localStorage.removeItem('token');
    localStorage.removeItem('userSurname');
    localStorage.removeItem('userAvatar');
    logout();
    clearMessage();

        return <Redirect to={routes.logoutsuccess} />;
      
};

const mapDispatchToProps = dispatch => ({
    logout: () =>dispatch(logoutAction()),
    clearMessage: () =>dispatch(clearMessageAction())
  });

export default connect(null, mapDispatchToProps)(LogoutPage);

