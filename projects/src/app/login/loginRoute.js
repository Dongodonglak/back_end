module.exports = function(app){
    const login = require('./loginController');

    // 1. 로그인 API
    app.get('/app/login/makelogin', login.makeLogin);
    app.post('/app/login', login.login);

    // 2. 세션에서 유저 아이디 가져오기 
    app.get('/app/sessionId', login.getUserId);

}