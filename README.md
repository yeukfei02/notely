<p align="center">
  <img width="200px" src="https://github.com/yeukfei02/notely/blob/main/readme-icon.png"><br/>
  <h2 align="center">notely</h2>
</p>

<p align="center">
  <img src="https://github.com/yeukfei02/notely/blob/main/screenshots/screenshot1.png">
</p>

<p align="center">
  <img src="https://github.com/yeukfei02/notely/blob/main/screenshots/screenshot2.png">
</p>

<p align="center">
  <img src="https://github.com/yeukfei02/notely/blob/main/screenshots/screenshot3.png">
</p>

<p align="center">
  <img src="https://github.com/yeukfei02/notely/blob/main/screenshots/screenshot4.png">
</p>

<p align="center">
  <img src="https://github.com/yeukfei02/notely/blob/main/screenshots/screenshot5.png">
</p>

free, open source notes in web (notes mac app alternative)

documentation: <https://documenter.getpostman.com/view/3827865/UzBsH4d5>

## Tech Stack

- Node.js
- React
- Typescript
- Nestjs
- Graphql
- Prisma
- Postgres
- Apollo Client
- Nx workspace

## Requirement

- install yarn
- install node (v16+)
- install nx (<https://github.com/nrwl/nx>)

## Testing and run

```zsh
// install node dependencies
$ yarn

// run api and web in local
$ yarn run dev

// run api in local
$ yarn run dev:api

// run web in local
$ yarn run dev:web

// production
$ yarn run start

// build dist for both api and web
$ yarn run build

// build dist only api
$ yarn run build:api

// build dist only web
$ yarn run build:web

// run test case for both api and web
$ yarn run test

// run test case only api
$ yarn run test:api

// run test case only web
$ yarn run test:web

// lint code
$ yarn run lint

// format code
$ yarn run format
```

```zsh
// create module
$ nx g @nrwl/nest:module <module-name>

// create resolver
$ nx g @nrwl/nest:resolver <resolver-name>

// create service
$ nx g @nrwl/nest:service <service-name>

// generate schema.prisma and prisma client
$ yarn run prisma:generate

// create migration file if schema.prisma changed
$ yarn run prisma:migrate:dev

// reset database
$ yarn run prisma:migrate:reset

// apply pending migrations in the production/staging database
$ yarn run prisma:migrate:deploy

// check migrations status in the production/staging database
$ yarn run prisma:migrate:status

// push schema.prisma state to database
$ yarn run prisma:db:push

// seed data to database
$ yarn run prisma:db:seed

// validate schema.prisma
$ yarn run prisma:validate

// format schema.prisma
$ yarn run prisma:format

// open prisma studio
$ yarn run prisma:studio
```

```zsh
// check for un-formatted files
$ nx format:check

// overwrite un-formatted files
$ nx format:write

// check nx graph
$ nx graph

// lists installed plugins, capabilities of installed plugins and other available plugins.
$ nx list

// reports useful version numbers to copy into the Nx issue template
$ nx report

// makes sure the workspace is connected to Nx Cloud
$ nx connect-to-nx-cloud

// check more nx commands
$ nx --help
```
