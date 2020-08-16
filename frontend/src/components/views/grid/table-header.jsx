  import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

export default class TableHeader extends Component {

  render() {
    const { columns, editable } = this.props;
    return (
      <Table.Header>
        <Table.Row>
          {columns.map(({ name }, index) => (<Table.HeaderCell key={index}>{name}</Table.HeaderCell>))}
          {editable && <Table.HeaderCell key={'directEditPanel'}>{'Edit'}</Table.HeaderCell>}
        </Table.Row>
      </Table.Header>
    );
  }
}