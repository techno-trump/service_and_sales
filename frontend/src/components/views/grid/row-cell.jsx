import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Segment, Input } from 'semantic-ui-react';

class CustomInput extends Input {
  render() {
    const { required, ...rest } = this.props;
    
    if (required) return <Input label={{ icon: 'asterisk' }} labelPosition='left corner' {...rest} />;
    
    return <Input {...rest} />;
  }
}

export default class RowCell extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);

    this.state = {
    };
  }
  
  renderString() {
    const { value, onChange, required, editable } = this.props;
    
    return (
      <CustomInput size={'mini'} required={required} value={value || ''} onChange={onChange} disabled={!editable}/>
    );
  }
  
  renderBody() {
    const { type } = this.props;
    
    switch (type) {
      case 'string':
        return this.renderString();
      default: 
        return (value);
    }
  }
  
  render() {
    const { editable } = this.props;
    
    return (
      <Table.Cell disabled={!editable}>{this.renderBody()}</Table.Cell>
    );
  }
}