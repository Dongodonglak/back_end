const user = require('./userController');
const path = require('path');
const express = require('../../../config/express');
// const bodyParser = require('body-parser');

module.exports = function(app){

    app.set('view engine', 'ejs');
    app.set('views', path.resolve() + '/views');

    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({extended: true}));

    const pathComp= require("express-static");
    app.use('/public', pathComp('public'));
    // app.use(express.urlencoded({extended: false}));
    // app.use(express.static(path.join(__dirname, 'public')));
    

    // 1. 유저 생성 (회원가입) API
    app.get('/app/users/signup', (req, res) => {
        res.render('signup');
    });
    app.post('/app/users/signup', user.postUsers);

    // 2. 유저 조회 API (+ 검색)
    app.get('/app/users',user.getUsers); 

};