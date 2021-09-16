** still under development **

## Get Started

---

Install dependencies

```bash
$ npm install
```

In order to have the database work correctly, install SQLite on your local computer.

## Development

Start dev server

```bash
$ npm run dev
```

This script utilizes the `concurrently` npm package allowing multiple scripts run at the same time. When you run this script for the first time it will create the development database for you. Below are the scripts that are ran.

- `dev:server` - starts the development server on port 8050
- `dev:client` - serves the development client build on port 3000

Both client and server will hot reaload on save.

## Production

Create production build

```bash
$ npm run build
```

This script will create prodcution builds of both client and server.
A server folder will be created at the root with the `NODE_ENV` will be set to production. A Dist folder will be created at the root as well for the client production build.

Serve production application

```bash
$ npm run start
```

- npm install pm2 -g

```bash
$ pm2 start app.js
```
