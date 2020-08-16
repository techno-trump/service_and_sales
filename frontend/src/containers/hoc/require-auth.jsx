import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

export default function (ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    }
    componentWillMount() {
        console.log('componentWillMount');
        console.log(this.props.location);
      if (!this.props.authenticated) {
        this.context.router.history.push('/user/login');
      }
    }

    componentWillUpdate(nextProps) {
        console.log('componentWillUpdate');
      if (!nextProps.authenticated) {
        this.context.router.history.push('/user/login');
      }
    }

    PropTypes = {
      router: PropTypes.object,
    }

    render() {
      //if (!this.props.authenticated) return <Redirect to={'/user/login'}/>;
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.user.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}