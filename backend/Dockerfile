FROM node:11.3.0

WORKDIR /tmp/node
COPY package.json /tmp/node/
RUN yarn install

WORKDIR /src/service_and_sales/backend
RUN cp -a /tmp/node/node_modules /src/service_and_sales/backend
