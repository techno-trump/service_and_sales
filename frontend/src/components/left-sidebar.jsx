import React, { Component } from 'react';
import { Container, Sidebar } from 'semantic-ui-react';

export default class LeftSidebar extends Component {
  render() {
    
    return (
      <Sidebar visible>
        {'Some string'}
      </Sidebar>
    );
  }
}