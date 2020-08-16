import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { login } from '../../actions/user';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form } from 'semantic-ui-react';

import LoginForm from '../../components/forms/login-form';

class LoginPageContainer extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
  }
  
  constructor(props) {
    super(props);

    this.state = {
      authenticated: this.props.authenticated,
      errors: {},
      isLoading: false,
    };
  }
  
  login = async (login, password) => {
      console.log(login, ' ', password);
    try {
      this.setState({ isLoading: true });
      await this.props.login({ login, password });
      this.props.history.push('/');
    } catch (ex) {
        console.log(ex);
      this.setState({ errors: ex.message, isLoading: false });
    }
  }
  
  render() {
    if (this.props.authenticated) return <Redirect to='/' />;
    return (
      <LoginForm login={this.login} />
    );
  }
}

function mapStateToProps (state) {
  const { authenticated } = state.user;
  return { authenticated };
}

export default compose(withRouter, connect(mapStateToProps, { login }))(LoginPageContainer);