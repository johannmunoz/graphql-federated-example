# Graphql Federation Example

## Prerequisites

You'll need:

* [docker](https://docs.docker.com/get-docker/)
* [docker-compose](https://docs.docker.com/compose/install/)
* `rover` [our new CLI](https://www.apollographql.com/docs/rover/getting-started)

## Local Development

### Local Supergraph Composition

See also: [Apollo Federation docs](https://www.apollographql.com/docs/federation/quickstart/)

You can federate multiple subgraphs into a supergraph using:

```sh
make demo
```

### Apollo Sandbox for Local Development

#### Deploy Graph

```
make docker-up
```

#### Cleanup

```
make docker-down
```
