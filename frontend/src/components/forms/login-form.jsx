import React, { Component } from 'react';
import { Form, Grid, Segment } from 'semantic-ui-react';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
    };
  }
  
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.login, this.state.password);
  }

  render() {
    return (
      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='Login' name='login' value={this.state.login} onChange={this.handleChange} />
                <Form.Input
                  fluid icon='lock' iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='password'
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <Form.Button color='teal' fluid size='large' content='Submit' />
               </Segment>
            </Form>
          </Grid.Column>  
         </Grid>
      </div>
    );
  }
}