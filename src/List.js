import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

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
