import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import TableHeader from './table-header';
import TableRow from './table-row';

export default class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyEditingRow: -1,
    };
  }
  handleStartRowEditing = (rowId) => {
    this.setState(state => ({ currentlyEditingRow: rowId }));
  }
  
  renderBody = () => {
    const { columns, records, editable } = this.props;

    return (
      <div className='table-container'>
        <Table size={'small'} compact celled singleLine={true}>
          <TableHeader
            columns={columns}
            editable={editable}
          />
          <Table.Body>{records.map(this.renderRow)}</Table.Body>
        </Table>
      </div>
    );
  }
  
  renderRow = (record, index) => {
    const { columns, editable, updateRecord } = this.props;
    const { currentlyEditingRow } = this.state;
    const currentlyEditing = currentlyEditingRow == index;
    
    return (
      <TableRow
        key={index}
        columns={columns}
        record={record}
        editable={editable}
        currentlyEditing={currentlyEditing}
        otherRowIsEditing={!currentlyEditing && currentlyEditingRow > -1}
        startEditing={() => this.handleStartRowEditing(index)}
        updateRecord={updateRecord}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderBody()}
      </div>
    );
  }
}