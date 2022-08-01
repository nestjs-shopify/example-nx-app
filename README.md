# Example @nestjs-shopify/@nestjs-shopify application

Uses [NX monorepo](https://nx.dev) under the hood. An example Shopify application
with a [NestJS](https://nestjs.com) API backend, and a [NextJS](https://nextjs.org) frontend.

## Architecture

The NestJS `api` application is proxied via NX proxies to `/api`. The `api` application also contains
a global prefix to `/api`.

Because we use NX proxies, we basically disable the usage of NextJS API requests in the `pages/api` folder because the requests are always proxied to the backend.

This application uses [Mikro-ORM](https://mikro-orm.io) for it's database. When performing offline auth, the authenticated shop gets inserted into the `shops` table with an offline token. This token can then be used for webhook/background operations.

## Setup

Install dependencies

```
npm install
```

Copy the example environment variables and fill in yours:

```
cp .env.example .env
```

The `HOST` env var should be your full Ngrok URL eg: https://7c350f27f75f.ngrok.io

Run the migrations:

```
cd apps/api
npx mikro-orm schema:update -r
```

## Running

On terminal window 1:

```
npx nx run api:serve
```

On terminal window 2:

```
npx nx run web:serve
```

Visit `https://<HOST>/?shop=<SHOP>` to start the OAuth installation procedure of your app.

## Authentication with Shopify

The application allows for both Online and Offline authentication. But Shopify recommends using
`offline` auth for only installing your application, and `online` auth for loading data in your frontend.

The `ProductsController` in this application that returns the total product count in Shopify, utilizes `@ShopifyOnlineAuth()` decorator. That signals our application to look for online JWT tokens when calling the `GET /api/products/count` route.

The frontend utilizes `@shopify/app-bridge` to transparently fetch online tokens for us using the `userLoggedInfetch` helper function.
