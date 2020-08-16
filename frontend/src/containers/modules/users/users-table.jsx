import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import GridView from '../../../components/views/grid';
import { fetchUsers } from '../../../actions/system-users';

class FastEditInterface {
  
}

const defaultLayout = [
    { alias: 'login', name: 'Login', type: 'string', required: true },
    { alias: 'name', name: 'Name', type: 'string' },
    { alias: 'surname', name: 'Surname', type: 'string' },
    
  ];

class UsersTable extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      pageNumber: 1,
    };
  }
  
  componentDidMount() {
    this.props.fetchUsers();
  }
  
  render() {
    const { isFetching, records, error } = this.props;
    return (
      <div>
        <Loader active={isFetching} />
        <GridView
          model={'Users'}
          columns={defaultLayout}
          records={records}
          updateRecord={() => { console.log('update record') }}
          editable={true}
          errors={{}}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  records: state.systemUsers.records,
  isFetching: state.systemUsers.isFetching,
  error: state.systemUsers.error
});

export default connect(mapStateToProps, { fetchUsers })(UsersTable);