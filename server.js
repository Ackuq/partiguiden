// Routing
const next = require("next");
const routes = require("./lib/routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);

// Use express
const express = require("express");
app.prepare().then(() => {
  express()
    .use(handler)
    .listen(3000);
});
