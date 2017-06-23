import React from 'react';
import { gql, graphql } from 'react-apollo';

const List = ({ data: { loading, people } }) => (
  <div>
    {loading ? (
      <p>Loading…</p>
    ) : (
      <ul>
        {people.map(person => (
          <li key={person.id}>
            {person.name}
          </li>
        ))}
      </ul>
    )}
  </div>
);

const query = gql`
query People {
  people {
    id
    name
  }
}
`;

export default graphql(query)(List);
