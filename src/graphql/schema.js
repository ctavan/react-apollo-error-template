import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

const peopleData = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Sara Smith' },
  { id: 3, name: 'Budd Deey' },
];

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => {
        console.log('Serving people from server', peopleData);
        return peopleData;
      },
    },
  },
});

const addPersonType = new GraphQLObjectType({
  name: 'addPerson',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPerson: {
      type: addPersonType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
      },
      resolve: (parent, person) => {
        peopleData.push(person);
        return person;
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
