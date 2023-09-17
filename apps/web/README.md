# Partiguiden web app

## Getting started

### Environment variables

To easily get started with the bare minimum environment variables to get started, a file `.env.example` is provided in this project. This configuration allows you to interact with the beta version of the backend. To copy this config, run:

```sh
cp .env.example .env
```

Alternatively, if have an authenticated vercel-cli and have access to the project, you can get a complete copy of the development environment configuration by running:

```sh
vercel env pull
```

### Running

You can run the application using the following command:

```sh
pnpm dev # Runs the command `next dev` (https://nextjs.org/docs/api-reference/cli#development)
```
