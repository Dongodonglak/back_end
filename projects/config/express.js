const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
var cors = require('cors');
const path = require('path');
const sessionMiddleware = require('./sessionMiddleware');
const bodyParser = require('body-parser');


module.exports = function () {
    const app = express();

    app.use(compression());

    app.use(express.json());

    app.use(express.urlencoded({extended: false}));

    app.use(methodOverride());

    app.use(cors());

    app.use(sessionMiddleware);
    
    app.set("view engine", "ejs");

    app.use(express.static(__dirname + './../public'));

  
    // TODO: 도메인을 추가할 경우 이곳에 Route를 추가하세요.
    require('../src/app/attendance/attendRoute')(app);
    require('../src/app/assignment/assignRoute')(app);
    require('../src/app/group/groupRoute')(app);
    require('../src/app/User/userRoute')(app);
    require('../src/app/Notice/noticeRoute')(app);
    require('../src/app/login/loginRoute')(app);

    return app;
};



// const { pool } = require('./database');