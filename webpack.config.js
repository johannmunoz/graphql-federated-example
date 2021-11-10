const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node',
  module: {
    rules: [
      // {
      //   test: /\.(graphql|gql)$/,
      //   loader: 'graphql-tag/loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
    },
    ],
  },
};
