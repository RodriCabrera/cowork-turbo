# BASE BLOOM

## Index

- [Apps and Packages](#apps-and-packages)
- [Branch Naming Convention](#branching-and-commiting-naming-conventions)
  - [Branchs](#branching-convention)
  - [Commits](#commit-convention)
- [Installing the dependencies](#installing-the-dependencies)
- [Running the project](#running-the-project)

&nbsp;

### Apps and Packages

- `front`: a [Next.js](https://nextjs.org/) app
- `api`: Express api, that uses Prisma.

- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `tailwind-config`: with the objective of having a unified design across the UIs.
- `types`: in order to avoid repeated declarations of the same type, we created this package with some interfaces to be reused throughout the project.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

&nbsp;


### Branching and commiting naming conventions

Both the branches and the commits will include the type of the task being worked on. The following is a list of the proposed types:

#### Branch/commit types:

- `feat` for a new feature.
- `fix` for a bug fix.
- `refactor` for refactoring code, e.g. renaming a variable, no change for the user.
- `style` for UI styling changes: css, tailwind classes, etc.
- `test` for adding and refatoring tests.
- `docs` for changes to the documentation.
- `chore` for "backstage" work, some type of task not included in the previous types.

&nbsp;

### Branching convention:

```
taskId/{app, package or root}/type/title(optional)
```
- **everything in lowercase.**
- The `taskId` is based on the Jira board. For this specific project, all the tasks will start with COW-###, followed by a number.
- The `{app or package or root}`, this could be called `workspace`. It's the app or package that's being worked on. Could be for example, `api`, `front`, `ui`, `types`, etc. Or if some Turbo base config is being targeted, it could be `root`.
- The `<type>` values will be the same used for the commits and branches. 
- The branch `title` is optional, and will be basically some keywords to distinguish the branch.

Example:

```
# with title
COW-456/api/fix/users-endpoint

# or without title
COW-456/api/fix
```
&nbsp;

### Commit convention:

Format of the commit message:

```
<type>: <subject>
<BLANK LINE>
<body/OPTIONAL>
```

Example:

```
fix: return the correct user list

Adjust the get all users endpoint. Remove typescript anys. Minor refactor of the database.
```

#### Message Subject and Body:

Both the subject and body of the commit should use the imperative, present tense: "change" not "changed" nor "changes".

&nbsp;

### Installing the dependencies:

in the root folder, run

```
$ yarn
```

If you want to install any other dependency, you should target an specific workspace (in our case, an app or package):
```
$ yarn workspace <workspace> add <package>

# for example:
$ yarn workspace front add axios

```
[See turbo docs](https://turbo.build/repo/docs/handbook/package-installation#addingremovingupgrading-packages)

&nbsp;


### Running the project:

If you run the following command in the root folder, both the `front` app and the `api` will be started in dev mode:

```
$ yarn dev
```

If you want to just run (in dev) a specific app, you can do:
```
$ yarn workspace <workspace> dev

# for example:
$ yarn workspace front dev
```

&nbsp;

### Utilities

This turborepo has some additional tools already setup:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

