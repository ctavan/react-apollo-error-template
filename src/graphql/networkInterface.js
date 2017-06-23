import { graphql, print } from 'graphql';
import { schema } from './schema';

export const networkInterface = {
  query({ query, variables, operationName }) {
    console.log('Starting network request', operationName, query, variables);
    return delay(500).then(() => {
      console.log('Resolving network request', operationName, query, variables);
      return graphql(
        schema,
        print(query),
        null,
        null,
        variables,
        operationName,
      );
    });
  },
};

function delay (ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
