const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

// Routing
const routes = require("./lib/routes");
const handler = routes.getRequestHandler(app);

app
  .prepare()
  .then(() => {
    server = express().use(handler);

    server.get("/subject/:id", (req, res) => {
      const actualPage = "/subject";
      const queryParams = {
        id: req.params.id
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
