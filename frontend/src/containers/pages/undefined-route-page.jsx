import React, { Component } from 'react';
import { connect } from 'react-redux';

class UndefinedRoutePageContainer extends Component {
  render() {
    return '404';
  }
}

function mapStateToProps (state) {
  return {};
}

export default connect(mapStateToProps)(UndefinedRoutePageContainer);