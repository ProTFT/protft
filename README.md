# ProTFT

ProTFT is a hobby project for a website to display results and statistics of previous Teamfight Tactics championships.

## Stack

- Frontend (`packages/ui/`) built with React + Typescript, which is still very much a prototype. There's UX work being done so this will change a lot on the future.

- Backend (`packages/api/`) built with NestJS + Typescript + TypeORM + GraphQL, which serves a GraphQL API with the results of previous tournaments to be consumed by the frontend.

## How to run

Clone the repository and run on the root:

```bash
$ yarn install
```

 You should not need to install dependencies as they are already bundled at `.yarn/cache` thanks to [yarn zero-installs](https://yarnpkg.com/features/zero-installs), but some linking is still necessary. Then, on each package there are instructions on how to run them.
