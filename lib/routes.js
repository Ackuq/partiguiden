// routes.js
const routes = require('next-routes');

module.exports = routes()
  .add('index')
  .add('om-oss')
  .add('partiernas-standpunkter')
  .add('riksdagsbeslut')
  .add('voteringar', '/voteringar')
  .add('subject', '/subject/:id')
  .add('beslut', '/beslut/:id')
  .add('votering', '/votering/:id/:bet')
  .add('dokument', '/dokument/:id')
  .add('kakpolicy')
  .add('ledamoter');
