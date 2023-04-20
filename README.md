# sample-auth0-react-nodejs

This is a sample to add authentication processing by Auth0 to SPA(React) and Nodejs(ApolloServer) web services.

# composition

A monorepo configuration containing the following projects:

- schema: GraphQL schema definition
   -graphql-codegen
- backend: GraphQL backend powered by ApolloServer
   - express
   - TypeORM
   -sqlite
   -jwks-rsa
- frontend-react: frontend with React.js
   - tailwind CSS
   - apollo-client
   - @auth0/auth0-react

# Operation check

## Auth0 signup

https://auth0.com/

Click the avatar icon on the top right of the screen and click "+ Create tenant" and enter the following items:
(*One tenant is created by default, so you can use it.)

- Tenant Domain: **react-graphql-sample-1**
- Region: **US**

Select "Applications" from the menu on the left of the screen and click the "+ Create Application" button. In the dialog make the following settings;

- Name: **react-graphql-sample-1**
- Choose an application type: **Single Page Web Applications**

Select "Settings" from the created app tab and add the following items;

- Allowed Callback URLs: http://localhost:8877/callback
- Allowed Logout URLs: http://localhost:8877
- Allowed Web Origins: http://localhost:8877

Select "APIs" from the menu on the left of the screen and click the "+ Create API" button. In the dialog make the following settings;

- Name: **react-graphql-sample-1**
- Identifier: http://react-graphql-sample-1.com

## set up

```
git clone https://github.com/suzukalight/sample-auth0-react-nodejs
yarn
```

## Setting environment variables

Copy the following environment variable files;

- backend: `.env.default` => `.env`
- frontend-react: `.env.default` => `.env.local`

Since it will be used as an environment variable for the application, please obtain the following information from the Auth0 management screen;

``` ini
#backend
AUTH0_JWKS_URI= # <YOUR_DOMAIN>/.well-known/jwks.json
AUTH0_AUDIENCE= # API - Identifier
AUTH0_ISSUER= # <YOUR_DOMAIN>
```

``` ini
#frontend-react
REACT_APP_AUTH0_DOMAIN= # Applications - Domain
REACT_APP_AUTH0_CLIENT_ID= # Applications - Client ID
REACT_APP_AUTH0_AUDIENCE= # API - Identifier
REACT_APP_AUTH0_APP_ORIGIN= #http://localhost:8877
REACT_APP_AUTH0_API_ORIGIN=# http://localhost:7777
```

# execution

```
yarn dev:backend
yarn dev:frontend-react
```

A login button will be displayed, so select Sign Up from there to create an account. From now on, you will be able to sign in with that account and view protected pages (`/account`, `/users`, etc.)

#NOTE

- The frontend-nextjs project is from WIP