import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './private-route';
import LoginPageContainer from './pages/login-page';
import LayoutContainer from './layout';
import UndefinedRoutePageContainer from './pages/undefined-route-page';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/user/login' component={LoginPageContainer} />
        <PrivateRoute path='/' component={LayoutContainer} />
        <Route path='*' component={UndefinedRoutePageContainer} />
      </Switch>  
    );
  }
}