const environment = process.env.NODE_ENV || 'dev';

let config = require('./dev.json');

if (environment !== 'dev') {
    config = require(`${environment}.json`);
}

module.exports = config;
