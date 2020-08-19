import React, {Component, useState, useEffect } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { routes } from 'routes';



class LogoutSuccessPage extends Component {
 

  state = {
    redirect: false,
}

componentDidMount() {
    setTimeout(() => {
        this.setState({
            redirect: true,
        })
    }, 2000)
}

render() {
    if (this.state.redirect) {
        return (
          window.location.href=routes.login
        )
        
        
    }

    return (
        <div>
            Redirecting to login page in two seconds
        </div>
    )
}
}

export default LogoutSuccessPage;

