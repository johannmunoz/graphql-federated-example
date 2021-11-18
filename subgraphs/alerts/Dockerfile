FROM node:16-alpine

WORKDIR /usr

COPY package.json .
COPY tsconfig.json .
COPY service-account.json .
COPY codegen.yml .
COPY alerts-schema.graphql .

COPY src ./src
RUN ls -a
RUN npm install
RUN npm run generate
RUN npm run build

CMD ["npm","run","start"]