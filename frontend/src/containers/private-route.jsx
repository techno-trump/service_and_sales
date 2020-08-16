import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends  Component {
  
  render() {
    const { component: Component, authenticated, ...rest } = this.props;
    return (
        <Route
          {...rest}
          render={props =>
            authenticated ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/user/login",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      );
  }
}
function mapStateToProps(state) {
  return { authenticated: state.user.authenticated };
}
export default connect(mapStateToProps)(PrivateRoute);