### Installing the dependencies:

in the root folder, run

```
yarn
```

#### Running the project:

If you run the following command in the root folder, both the `front` app and the `api` will be started in dev mode:

```
yarn dev
```

Or if you want to run only one app, you can run the same command in the corresponding app folder.

### Apps and Packages

- `front`: a [Next.js](https://nextjs.org/) app
- `api`: Express

- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

