module.exports = function(app){
    const attend = require('./attendController');

    // 1. 출결 조회 API
    app.get('/app/members/:groupId/attendance/:date', attend.getAttendance);

};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API