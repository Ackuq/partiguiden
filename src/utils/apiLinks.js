export default {
  partiguidenApi:
    process.env.NODE_ENV === 'production' ? 'https://api.partiguiden.nu' : 'http://localhost:3001',
  riksdagenApi: 'https://data.riksdagen.se',
};
