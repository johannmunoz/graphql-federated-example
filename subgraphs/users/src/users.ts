import { readFileSync } from 'fs';
import { ApolloServer, gql } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/federation';
import { UsersService } from './users-service';
import * as admin from 'firebase-admin';
import { CreateUserInput } from './graphql-types';

const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const port = process.env.APOLLO_PORT || 4000;

const typeDefs = gql(
  readFileSync('./users-schema.graphql', { encoding: 'utf-8' })
);

const resolvers = {
  Query: {
    users: (_: null, __: null, context: UserContext) =>
      context.users.getAllUsers(),
    user: (_: null, args: { id: string }, context: UserContext) =>
      context.users.getUser(args.id),
  },
  Mutation: {
    async createUser(_: null, data: any, context: UserContext) {
      const input = data.input as CreateUserInput;
      const result = await context.users.createUser(input);
      return result;
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers: resolvers as any }),
  context: async ({ req }) => {
    const users = new UsersService();
    return { users };
  },
});

server
  .listen({ port: port })
  .then(({ url }) => {
    console.log(`🚀 Users subgraph ready at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });

interface UserContext {
  users: UsersService;
}
