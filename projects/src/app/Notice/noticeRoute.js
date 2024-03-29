module.exports = function(app, upload){
    const notice = require('./noticeController');

    // 1. 모든 공지글 조회 API
    // 게시글 목록 최신순 조회
    app.get('/app/cursorPageRecent/:page', notice.paging_Recent);
    // 게시글 목록 오래된순 조회
    app.get('/app/cursorPageOld/:page', notice.paging_Old);

    // 2. 특정 공지글 조회 API
    app.get('/app/notice/:groupId/:noticeId', notice.getNotice);

    // 3. 새로운 공지글 등록 API
    // 공지글 작성하는 페이지
    app.get('/app/createNotice', notice.makeNotice);
    // 공지글 작성하는 ejs 파일에서 action으로 정한 라우트(데베에 저장 위해) 
    // app.post('/app/notice', upload.single('file'), notice.postNotice);
    app.post('/app/notice', notice.postNotice);


    // 4. 공지글 수정 API
    app.patch('/app/notices/', notice.patchNotice);



    // 그룹 초대 링크
    app.get('/app/invite', notice.inviteGroup);

};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API

// router.get('/page/:page',function(req,res,next)
// {
//     var page = req.params.page;
//     var sql = "SELECT idx, name, title, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
//         "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate,hit from board";
//     conn.query(sql, function (err, rows) {
//         if (err) console.error("err : " + err);
//         res.render('page', {title: ' 게시판 리스트', rows: rows, page:page, length:rows.length-1, page_num:10, pass:true});
//         console.log(rows.length-1);
//     });
// });