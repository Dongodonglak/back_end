const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
var cors = require('cors');
const path = require('path');


module.exports = function () {
    const app = express();

    app.use(compression());

    app.use(express.json());

    app.use(express.urlencoded({extended: false}));

    app.use(methodOverride());

    app.use(cors());

    app.use(express.static(__dirname + './../public'));

    /* App (Android, iOS) */
    // TODO: 도메인을 추가할 경우 이곳에 Route를 추가하세요.
    require('../src/app/Attendance/attendRoute')(app);
    require('../src/app/Notice/noticeRoute')(app);

    return app;
};

