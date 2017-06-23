import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class Create extends Component {
  create = () => {
    this.props.mutate({
      variables: {
        id: 4,
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
