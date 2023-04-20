# COWORK APP (TBD Title)

### Installing the dependencies:

in the root folder, run

```
yarn
```

If you want to install any other dependency, you should target an specific workspace (in our case, an app or package):
```
yarn workspace <workspace> add <package>
```
[See turbo docs](https://turbo.build/repo/docs/handbook/package-installation#addingremovingupgrading-packages)

#### Running the project:

If you run the following command in the root folder, both the `front` app and the `api` will be started in dev mode:

```
yarn dev
```

If you want to just run (in dev) a specific app, you can do:
```
yarn workspace <workspace> dev

yarn workspace front dev
```

### Apps and Packages

- `front`: a [Next.js](https://nextjs.org/) app
- `api`: Express

- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- 'tailwind-config': with the objective of having a unified design across the UIs.
- 'types': in order to avoid repeated declarations of the same type, we created this package with some interfaces to be reused throughout the project.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

