# TFTourney API

The TFTourney API runs on top of NestJS and it relies on a Postgres database to store the data. You can run Postgres locally with Docker Compose:

`docker compose up`

This will spin up an instance of Postgres, plus an Adminer admin page at localhost:8080 so you can operate on the DB. Login with the following credentials:

- server: dbPostgres
- username: root
- password: changeme
- database: mydb

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

All these options will run the app on `localhost:3001` (or `process.env.PORT`), and you can access the Apollo Playground to simulate graphql queries on `localhost:3001/graphql`.

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
