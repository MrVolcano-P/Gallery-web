FROM node:latest as builder

WORKDIR /app

RUN yarn add global react-scripts

COPY package.json /app

COPY yarn.lock /app

RUN yarn install

COPY . /app

RUN yarn build


FROM caddy:2.0.0-alpine

COPY --from=builder /app/build /app

EXPOSE 80

EXPOSE 443