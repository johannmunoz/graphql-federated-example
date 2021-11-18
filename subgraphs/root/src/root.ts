import { buildSubgraphSchema } from '@apollo/federation';
import { ApolloServer, gql } from 'apollo-server';
import {
  CreateHostInput,
  CreateHostResponse,
} from './graphql-types';
import { RootService } from './root-service';
import { readFileSync } from 'fs';
import * as admin from 'firebase-admin';

const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const port = process.env.APOLLO_PORT || 4000;

const typeDefs = gql(
  readFileSync('./root-schema.graphql', { encoding: 'utf-8' })
);

const resolvers = {
  Query: {
    hosts: (_: null, __: null, context: RootContext) =>
      context.root.getAllHosts(),
  },
  Mutation: {
    async createHost(_: null, data: any, context: RootContext) {
      const input = data.input as CreateHostInput;
      const host = await context.root.createHost(input);
      if (!host) {
        return {
          code: '500',
          success: false,
          message: 'Error creating user',
        } as CreateHostResponse;
      }
      return {
        code: '200',
        success: true,
        message: '',
        host: host,
      } as CreateHostResponse;
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers: resolvers as any }),
  context: async ({ req }) => {
    const root = new RootService();
    return { root };
  },
});

server
  .listen({ port: port })
  .then(({ url }) => {
    console.log(`🚀 Root subgraph ready at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });

interface RootContext {
  root: RootService;
}
