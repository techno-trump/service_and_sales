import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isFetching: true,
      pageNumber: 1,
    };
  }
  
  
  render() {
    const { isFetching } = this.state;
    return (
      <div>
        <Loader active={isFetching} />
      </div>
    );
  }
}