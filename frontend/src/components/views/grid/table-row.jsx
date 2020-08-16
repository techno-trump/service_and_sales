import React, { Component } from 'react';
import { Table, Item, Icon, Button } from 'semantic-ui-react';
import RowCell from './row-cell';

export default class TableRow extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { columns, record, editable, currentlyEditing, otherRowIsEditing } = this.props;
    const { startEditing, cancelEditing, appyChanges, fastCellChange, deleteRecord } = this.props;
    
    return (
        <Table.Row>
          {columns.map(({ alias, type, required }, index) => (
              <RowCell
                key={index}
                type={type}
                value={record[alias]}
                required={required}
                editable={currentlyEditing}
              />
            ))
          }
          { editable &&
            <Table.Cell
              key={'directEditTools'}
              textAlign={'center'}
            >
              {currentlyEditing && <Icon link name='save outline' color='green' size='large' onClick={() => alert('saving')} />}
              {currentlyEditing && <Icon link name='cancel' color='red' size='large' onClick={() => alert('canceling')} />}
              {!otherRowIsEditing && !currentlyEditing && <Icon link name='edit' size='large' onClick={startEditing} />}
              {!otherRowIsEditing && !currentlyEditing && <Icon link name='trash' size='large' color='red' onClick={deleteRecord} />}
            </Table.Cell>
          }
        </Table.Row>
    );
  }
}