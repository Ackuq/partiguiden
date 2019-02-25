// Routing
const next = require("next");
const routes = require("./lib/routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);

const port = process.env.PORT || 8080;
// Use express
const express = require("express");
app.prepare().then(() => {
  express()
    .use(handler)
    .listen(port);
});
