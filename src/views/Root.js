import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { routes } from 'routes';
import store from 'store';
import MainTemplate from 'templates/MainTemplate';

import Statistics from 'views/Statistics';
import Error404 from 'views/404';
import Notifications from 'views/Notifications';

import Avatar from 'views/settings/Avatar';
import Settings from 'views/settings/Settings';
import Users from 'views/settings/Users';
import EditUser from 'views/settings/Users/EditUser';
import EditUserForm from 'views/settings/Users/EditUserForm';
import AddUserForm from 'views/settings/Users/AddUserForm';

import Company from 'views/settings/Company';
import CompanyLogotype from 'views/settings/Company/Logotype';
import CompanyMainColor from 'views/settings/Company/MainColor';

import CompanyWorkPlaces from 'views/settings/Company/WorkPlaces';
import CompanyWorkPlaceEdit from 'views/settings/Company/WorkPlaces/Edit';
import CompanyWorkPlaceCreate from 'views/settings/Company/WorkPlaces/Create';
import CompanyWorkPlacePermissions from 'views/settings/Company/WorkPlaces/Permission';

import Customers from 'views/settings/Customers';
import CreateCustomer from 'views/settings/Customers/CreateCustomer';

import Person from 'views/settings/Person';
import Calendar from 'views/Calendar';
import LoginPage from 'views/LoginPage';
import RegisterPage from 'views/RegisterPage';

import LogoutPage from 'views/LogoutPage';
import LogoutSuccessPage from 'views/LogoutSuccessPage';

import 'theme/bootstrap.css';

 

const Root = () => (
 
  <Provider store={store}>
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path={routes.login} component={LoginPage} />
          <Route exact path={routes.register} component={RegisterPage} />
          <Route exact path={routes.logout} component={LogoutPage} />
          <Route exact path={routes.logoutsuccess} component={LogoutSuccessPage} />
          <Route exact path={routes.home} render={() => <Redirect to="/calendar" />} />
          <Route exact path={routes.calendar} component={Calendar} />
          <Route exact path={routes.error404} component={Error404} />
          <Route exact path={routes.statistics} component={Statistics} />
          <Route exact path={routes.notifications} component={Notifications} />
          <Route exact path={routes.settings.home} component={Settings} />
          <Route  path={routes.settings.avatar} component={Avatar} />
          <Route  path={routes.settings.person} component={Person} />

          <Route exact path={routes.settings.users.home} component={Users} />
              <Route exact path={routes.settings.users.edituser} component={EditUser} />
              <Route path={routes.settings.users.edituserform} component={EditUserForm} />
              <Route path={routes.settings.users.adduserform} component={AddUserForm} />

          
          <Route exact path={routes.settings.company.info} component={Company} />
              <Route  path={routes.settings.company.logotype} component={CompanyLogotype} />
              <Route  path={routes.settings.company.maincolor} component={CompanyMainColor} />

              <Route  exact path={routes.settings.company.workplaces.home} component={CompanyWorkPlaces} />
              <Route  path={routes.settings.company.workplaces.edit} component={CompanyWorkPlaceEdit} />
              <Route  path={routes.settings.company.workplaces.create} component={CompanyWorkPlaceCreate} />
              <Route  path={routes.settings.company.workplaces.permissions} component={CompanyWorkPlacePermissions} />


          <Route exact path={routes.settings.customers.home} component={Customers} />
              
              <Route path={routes.settings.customers.create} component={CreateCustomer} />

        </Switch>
      </MainTemplate>
    </BrowserRouter>
  </Provider>
);

export default Root;
