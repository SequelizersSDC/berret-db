const MySql = require('mysql');
const Promise = require('bluebird');
const credentials = require('./db.config.js');

const connection = MySql.createConnection(credentials)

const db = Promise.promisifyAll(connection, { multiArgs: true });

module.exports = db;