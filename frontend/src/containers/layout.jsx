import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/layout';
import { toggleNavbarVisibility } from '../actions/navbar';

class LayoutContainer extends Component {
  
  render() {
    const { match, navbarState } = this.props;
      console.log('navbarState: ', navbarState);
      console.log(this.props.toggleNavbarVisibility);
    return (
      <Layout match={match} navbarState={navbarState} toggleNavbarVisibility={this.props.toggleNavbarVisibility} />
    )
  }
}
function mapStateToProps(state) {
  return { navbarState: state.navbar };
}
export default connect(mapStateToProps, { toggleNavbarVisibility })(LayoutContainer);