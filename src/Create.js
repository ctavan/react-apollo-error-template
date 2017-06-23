import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

class Create extends Component {
  create = () => {
    this.props.mutate({
      variables: {
        id: 3,
        name: 'Maggie',
      }
    }).then(() => {
      console.log('Mutation done');
      this.props.onSuccess();
    }).catch((err) => {
      console.error('Mutation error', err);
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.create()}>Create Person</button>
      </div>
    );
  }
}

const mutation = gql`
mutation AddPerson($id: ID!, $name: String!) {
  addPerson(id: $id, name: $name) {
    id
    name
  }
}
`;

export default graphql(mutation, {
  options: {
    refetchQueries: ['People'],
  }
})(Create);
