import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import UsersTable from './users-table';
import UserForm from './user-form';

class Users extends Component {
  constructor(props) {
    super(props);
    
    this.state = {};
  }
  
  
  render() {
    const { match } = this.props;
    const { isFetching } = this.state;
    return (
      <div>
        <Route exact path={`${match.url}`} component={UsersTable} />
        <Route exact path={`${match.url}:id`} component={UserForm} />
      </div>
    );
  }
}

export default connect(null, null)(Users);