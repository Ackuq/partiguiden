# Partiguiden - Party information and parliament data made accessible

Partiguiden is a website created with the purpose of making information about the political climate in Sweden as accessible as possible.

## Table of contents

1. [Tools used](#tools-used)
2. [Development](#development)
   1. [Prerequisites](#prerequisites)
   2. [Environment variables](#environment-variables)
   3. [Running](#running)
   4. [Linting and formatting](#linting-and-formatting)
3. [CI/CD](#cicd)
   1. [Continuos integration](#continuos-integration)
   2. [Continuos deployment](#continuos-deployment)
4. [Deployment environments](#deployment-environments)

## Tools used

- [React.js](https://reactjs.org/) - Javascript framework for developing web apps.
- [Next.js](https://nextjs.org/) - React.js framework for developing server rendered apps.
- [Vercel](https://vercel.com/) - For deployments

## Development

In this section, information on how to set up and contribute to the project will be presented.

### Prerequisites

- [pnpm](https://pnpm.io) - Package manager
- [vercel-cli](https://vercel.com/docs/cli) - (optional) Used for interacting with the vercel project

### Running

You can run the application using the following command:

```sh
pnpm dev # Runs the command `next dev` (https://nextjs.org/docs/api-reference/cli#development)
```

### Linting and formatting

This project uses [ESLint](https://eslint.org) and [Prettier](https://prettier.io) for code linting and formatting. The configuration for ESLint can be found in the file [.eslintrc](./.eslintrc) and for Prettier in the file [.prettierrc](./.prettierrc). To check linting and formatting of the project, run the command:

```sh
pnpm lint # Will run `eslint` and `tsc` for linting and type checking
pnpm format:check # Checks that formatting is OK
```

## CI/CD

This project used Github Actions for continuos integration and a Vercel integration for continuos deployment.

### Continuos integration

The Github Actions workflows can be found in the directory [.github/workflows/](./.github/workflows/). The purpose of these workflows is to run tests and ensure that the files abide by the linting and code formatting configurations.

### Continuos deployment

This project uses Vercel for continuos deployment. Beside from the production and beta environment, deployments are also made for every incoming PR, these will be deployed to a separate automatic generated domain using Vercel's Preview configuration. New features should be tested within the preview environment before added to the beta branch.

## Deployment environments

| Environment | Branch      | Domain                                             | Notes                                                                                                   |
| ----------- | ----------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Production  | `main`      | [partiguiden.nu](https://partiguiden.nu)           | User facing version of the website                                                                      |
| Beta        | `develop`   | [beta.partiguiden.nu](https://beta.partiguiden.nu) | Environment for testing new features / improvements                                                     |
| Preview     | PR branches | -                                                  | Environment that is used for incoming PR's, will deploy to an automatic generated url, hosted on Vercel |
