import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link } from 'react-router-dom';
import { Sidebar, Segment, Menu, Icon, Item } from 'semantic-ui-react';
import Users from '../containers/modules/users';
import '../styles/layout.css';

class Navbar extends Component {
  render() {
    const { visible } = this.props;

    return (
      <Sidebar
        as={Menu}
        animation='push'
        icon='labeled'
        inverted
        vertical
        visible={visible}
        width='thin'
      >
        <Menu.Item 
          as={Link}
          to={{
            pathname: "/users"
          }}
        >
          <Icon name='users' />
          Users
        </Menu.Item>
      </Sidebar>
    );
  }
}
class LayoutHeader extends Component {
  render() {
    const { toggleNavbarVisibility } = this.props;

    return (
      <Menu attached={'top'} className={'layout-header'}>
        <Item as='a' onClick={toggleNavbarVisibility}>
          <Icon name={'content'} />
        </Item>
      </Menu>
    );
  }
}
class LayoutBody extends Component {
  render() {
    const { match, navbarState } = this.props;
    
    return (
      <Sidebar.Pushable attached={'bottom'} as={Segment} className={'layout-body'}>
        <Navbar {...navbarState} />
        <Sidebar.Pusher>
          <Segment basic>
            <Route path={`${match.url}users`} component={Users} />
            <Route path={`${match.url}roles`} render={() => 'Roles'} />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default class Layout extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }
  
  componentDidMount() {
    const layoutHeader = document.querySelector(".layout-header");
    const layoutBody = document.querySelector(".layout-body");
    layoutBody.style.height = `calc(100% - ${layoutHeader.offsetHeight}px)`;  
  }

  constructor(props) {
    super(props);

    this.state = {
    };
  }
  render() {
    const { match, navbarState, toggleNavbarVisibility } = this.props;
    
    return (
      <div className='layout'>
        <LayoutHeader toggleNavbarVisibility={toggleNavbarVisibility} />
        <LayoutBody match={match} navbarState={navbarState} />
      </div>
    );
  }
}