//const session = require('express-session');
const express = require('./config/express');
const {logger} = require('./config/winston');
require('dotenv').config();
const port = 3000;
express().listen(port);
logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);
//console.log(process.env.SESSION_SECRET);