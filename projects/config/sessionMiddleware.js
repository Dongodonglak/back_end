const session = require('express-session');
const session_store = require('session-file-store')(session);
const MySQLStore = require('express-mysql-session')(session);
//const app = require('./express.js');
require('dotenv').config();

const options = {
  host: '34.22.77.203',
  user: 'root',
  port: '3306',
  password: 'dongdong9',
  database: 'DGDL'
}

const sessionStore = new MySQLStore(options);

module.exports = session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true , maxAge: 1000 * 60 * 60 * 24 * 7 },
        store: sessionStore
});

