FROM node:11.3.0

WORKDIR /tmp/node
COPY package.json yarn.lock /tmp/node/
RUN yarn install

WORKDIR /src/service_and_sales/frontend
RUN cp -a /tmp/node/node_modules /src/service_and_sales/frontend
