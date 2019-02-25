// routes.js
const routes = require("next-routes");

module.exports = routes()
  .add("index")
  .add("om-oss")
  .add("partiernas-standpunkter")
  .add("subject", "/subject/:id")
  .add("search", "/search:query");
