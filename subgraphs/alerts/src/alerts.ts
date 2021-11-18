import { buildSubgraphSchema } from '@apollo/federation';
import { ApolloServer, gql } from 'apollo-server';
import { User } from './graphql-types';
import { AlertsService } from './alerts-service';
import { readFileSync } from 'fs';
import * as admin from 'firebase-admin';

const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const port = process.env.APOLLO_PORT || 4000;

const typeDefs = gql(
  readFileSync('./alerts-schema.graphql', { encoding: 'utf-8' })
);

const resolvers = {
  User: {
    alerts: (user: User, _: null, context: AlertsContext) =>
      context.alerts.getAlerts(user.id),
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers: resolvers as any }),
  context: async ({ req }) => {
    const alerts = new AlertsService();
    return { alerts };
  },
});

server
  .listen({ port: port })
  .then(({ url }) => {
    console.log(`🚀 Alerts subgraph ready at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });

interface AlertsContext {
  alerts: AlertsService;
}
