# DTTL Africa Code Wars

Welcome to the DTTL Africa Code Wars repository! This application aims to create a platform that allows teams of code warriors to register for and participate in curated contests that will test their coding mettle 😎

## Collaborating

Reach out to [HezeKhaya](https://github.com/HezeKhaya) to request access to the repository.

## Platform

### Framework

The application uses the [Next.js](https://nextjs.org/) framework. Next.js was chosen to give contributors and opportunity to try out this popular web framework.

### Development Platform

We are using [Supabase](https://supabase.com/) as a platform for authentication and as a database. Supbase is a popular platform built on Postgres.

### Technologies

The last notable items in our long list of awesome tech are:

#### Chakra UI

[Chakra UI](https://www.chakra-ui.com/) is a modern component library that allows you to create rich UIs using composable components.

#### Kysely

[Kysely](https://www.kysely.dev/) is a light-weight ORM with type-safe goodness.

#### Biome.js

[Biome.js](https://biomejs.dev/) is a modern formatter and linter built on Rust, making it lightning fast compared to its competitors.

## CI/CD

To keep things simple, the app is hosted on [Vercel](https://vercel.com). Vercel provides automated CI/CD integration with Github, so any pushes to main will deploy to production. The production site can be accessed [here](https://dttl-africa-code-wars-katas.vercel.app/).

When you create a new pull request, Vercel will also create preview deployments for the branch that you want to merge. Check out the pull request or the [deployments page](https://github.com/HezeKhaya/DTTL-Africa-Code-Wars/deployments) to access these previews and test drive the changes!

## Getting Started

### Install Packages

### Setup Supabase for Local Development

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) and make sure that it is running.
2. Install the Supabase CLI:

```sh
npm install supabase --save-dev
```

3. In your repo, initialize the Supabase project:

```sh
npx supabase init
```

4. Start the Supabase stack:

```sh
npx supabase start
```

5. View your local Supabase instance at [http://localhost:54323](http://localhost:54323).

Reference: [Supabase Local Development](https://supabase.com/docs/guides/local-development)