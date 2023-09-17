const createProxyServer = require("http-proxy").createProxyServer;
const fs = require("node:fs");
const parseArgs = require("node:util").parseArgs;

const {
  values: { port, target },
} = parseArgs({
  options: {
    port: {
      type: "string",
      short: "p",
      default: "3001",
    },
    target: {
      type: "string",
      short: "t",
      default: "3000",
    },
  },
});

const KEY_PATH = ".cert/localhost.key";
const CERT_PATH = ".cert/localhost.crt";

if (!fs.existsSync(KEY_PATH) || !fs.existsSync(CERT_PATH)) {
  console.error(`${KEY_PATH} and/or ${CERT_PATH} not found.`);
  process.exit(1);
}

createProxyServer({
  target: {
    host: "localhost",
    port: parseInt(target),
  },
  ssl: {
    key: fs.readFileSync(".cert/localhost.key"),
    cert: fs.readFileSync(".cert/localhost.crt"),
  },
  ws: true,
})
  .on("error", (e) => {
    console.error("Error while starting HTTPS proxy", e);
  })
  .listen(parseInt(port));

console.log(
  "- \x1b[32mready\x1b[0m started proxy server on",
  `https://localhost:${port}`,
);
