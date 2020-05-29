import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { routes } from 'routes';
import store from 'store';
import MainTemplate from 'templates/MainTemplate';
import Statistics from 'views/Statistics';
import Calendar from 'views/Calendar';
import LoginPage from 'views/LoginPage';
import LogoutPage from 'views/LogoutPage';
import 'theme/bootstrap.css';



const Root = () => (
 
  <Provider store={store}>
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path={routes.login} component={LoginPage} />
          <Route exact path={routes.logout} component={LogoutPage} />
          <Route exact path={routes.home} render={() => <Redirect to="/calendar" />} />
          <Route exact path={routes.calendar} component={Calendar} />
          <Route exact path={routes.statistics} component={Statistics} />
          
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  </Provider>
);

export default Root;
