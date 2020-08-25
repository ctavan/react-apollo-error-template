import React, { useState, useEffect } from 'react';
import { gql, useApolloClient } from '@apollo/client';

const FIRST_QUERY = gql`
  query FirstIntendedQuery {
    valueIWantToQuery
  }
`;

export default function App() {
  const apolloClient = useApolloClient();
  const [firstError, setFirstError] = useState(null);
  const [secondError, setSecondError] = useState(null);

  useEffect(() => {
    try {
      // As of @apollo/client 3.0 the ROOT_QUERY is apparently empty until the first *real* graphql
      // query happened. This leads to `apolloClient.readQuery()` _not_ throwing when the store is
      // still in that completely empty state. Once there is a value in the store, readQuery will
      // throw as expected.
      apolloClient.readQuery({ query: FIRST_QUERY });
    } catch (err) {
      setFirstError(err);
    }

    // Once we write something to the store and repeat readQuery for some missing values, we get
    // the expected error:
    try {
      apolloClient.writeQuery({
        query: gql`
          query RootQueryInit {
            rootQueryInit
          }
        `,
        data: {
          rootQueryInit: true,
        },
      });
      apolloClient.readQuery({ query: FIRST_QUERY });
    } catch (err) {
      setSecondError(err);
    }
  }, []);

  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <p>
        When running client.readQuery on an entirely empty store it fails silently because
        ROOT_QUERY does not exist yet:
      </p>
      <pre>{JSON.stringify(firstError, null, 2)}</pre>
      <p>Only after adding something to the store it fails with the expected error:</p>
      <pre>{JSON.stringify(secondError, null, 2)}</pre>
    </main>
  );
}
