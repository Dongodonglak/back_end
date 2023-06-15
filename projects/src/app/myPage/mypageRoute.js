


module.exports = function(app){

    const mypage = require('./mypageController');
    
    // 0. 마이페이지 조회 API
    app.get('/app/:groupId/:userId/mypage', mypage.getMypage);

    // 1. 유저 닉네임 조회 API
    app.get('/app/:groupId/:userId/me/name', mypage.getName); // getName 라우트 생성

    // 2. 유저별 게시글 수 조회
    app.get('/app/:groupId/:userId/me/posts', mypage.getPosts); // getPosts 라우트 생성

    // 3. 유저별 좋아요 수 조회
    app.get('/app/:groupId/:userId/me/likes', mypage.getLikes); // getPosts 라우트 생성

    // 4. 유저별 댓글 수 조회
    app.get('/app/:groupId/:userId/me/comments', mypage.getComments); // getComments 라우트 생성

    // 8. 유저별 프로필 사진 조회
    app.get('/app/:groupId/:userId/me/avatar', mypage.getAvatar); // getAvatar 라우트 생성
    
    // 10. 유저별 상점 조회
    app.get('/app/:groupId/:userId/me/reward-pnt', mypage.getRewardPnt); // getRewardPnt 라우트 생성

    // 11. 유저별 벌점 조회
    app.get('/app/:groupId/:userId/me/penalty-pnt', mypage.getPenaltyPnt); // getPenaltyPnt 라우트 생성

    // 12. 유저별 상벌점 합계 조회
    app.get('/app/:groupId/:userId/me/total-pnt', mypage.getTotalPnt); // getTotalPnt 라우트 생성
};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API