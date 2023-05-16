const { Router } = require('express');

module.exports = function(app){
    const Board = require('../controllers/boardController');

    // 과제 API 
    //1. 모든 과제 게시글 조회
    Router.get('/app/:groupId/homworks/assignments',Board.getHomework);
    
    //2. 특정 과제 게시글 조회
    Router.get('/app/:groupId/homworks/assignments/:assignmentId',Board.viewHomework);
}