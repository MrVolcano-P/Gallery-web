FROM node:latest as builder

WORKDIR /app

COPY package.json /app

COPY yarn.lock /app

RUN yarn install

COPY . ./

RUN yarn build


FROM caddy:2.0.0-alpine

COPY --from=builder /app/build /app

EXPOSE 80

EXPOSE 443