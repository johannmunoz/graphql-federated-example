import { buildSubgraphSchema } from '@apollo/federation';
import { ApolloServer, gql } from 'apollo-server';
import { User } from '../../generated/graphql-types';
import { NoticesService } from './notices-service';
import { readFileSync } from 'fs';
import * as admin from 'firebase-admin';

const serviceAccount = require('../../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const port = process.env.APOLLO_PORT || 4402;

const typeDefs = gql(
  readFileSync('./notices-schema.graphql', { encoding: 'utf-8' })
);

const resolvers = {
  User: {
    notices: (user: User, _: null, context: NoticesContext) =>
      context.notices.getNotices(user.id),
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers: resolvers as any }),
  context: async ({ req }) => {
    const notices = new NoticesService();
    return { notices };
  },
});

server
  .listen({ port: port })
  .then(({ url }) => {
    console.log(`🚀 Notices subgraph ready at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });

interface NoticesContext {
  notices: NoticesService;
}
