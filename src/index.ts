import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server';
import { readFileSync } from 'fs';

const supergraphSdl = readFileSync('./supergraph.graphql').toString();

const gateway = new ApolloGateway({
  // serviceList: [{ name: '', url: '' }],
  supergraphSdl,
});

const server = new ApolloServer({
  gateway,
});

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀 Gateway ready at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
