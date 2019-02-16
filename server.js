// Routing
const next = require('next');
const express = require('express');
const routes = require('./lib/routes');

const app = next({ dev: process.env.NODE_ENV !== 'production' });

const handler = routes.getRequestHandler(app);

const port = process.env.PORT || 8000;

const robotsOptions = {
  root: `${__dirname}/static/`,
  headers: {
    'Content-Type': 'text/plain;charset=UTF-8'
  }
};

app.prepare().then(() => {
  const server = express();

  server.get('/robots.txt', (req, res) => res.status(200).sendFile('robots.txt', robotsOptions));

  server.use(handler).listen(port);
});
