const noticeProvider = require("./noticeProvider");
const noticeService = require("./noticeService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const getUserId = require("../login/loginController");
const regexEmail = require("regex-email");
const {emit} = require("nodemon");

// 유저아이디 가져오기
// 1. post
// const userId = getUserId.getUserId;
// userId = req.body.userId;

// 2. get
// const userId = getUserId.getUserId;
// req.parmas.userId = userId;


exports.main = async function (req, res) {

  /**
   * path variable : groupId
   */
  // const groupId = req.params.groupId;

  // const noticeResponse = await noticeProvider.noticeListResult(groupId);
  // return res.send(response(baseResponse.SUCCESS, noticeResponse));
  return res.render("../views/mainPage.ejs");

};



/**
 * API No. 1
 * API Name : 전체 공지글 조회 API
 * [GET] /app/:groupId/notices
 */
exports.getNoticeList = async function (req, res) {

  /**
   * path variable : groupId
   */
  const groupId = req.session.groupId;

  const noticeResponse = await noticeProvider.noticeListResult(groupId);
  return res.render("../views/notice/noticeList.ejs",{result:noticeResponse});

};
// 페이징 연습
exports.paging = async function (req, res) {
  const page = req.params.page;
  const groupId = req.session.groupId;

  const pagingResponse = await noticeProvider.pagingResult_Old(groupId);
  return res.render("../views/notice/noticeList.ejs", {title: '게시판 리스트',
   rows: pagingResponse, page:page, groupId:pagingResponse.groupId, length:pagingResponse.length-1, page_num:5, pass:true});
}
// 페이징 연습 - 커서 기반
exports.paging_Recent = async function (req, res) {
  const page = req.params.page;
  const groupId = req.session.groupId;

  const pagingResponse = await noticeProvider.pagingResult_Recent(groupId, page);
  return res.render("../views/notice/noticeList_recent.ejs", {title: '게시판 리스트',
   rows: pagingResponse, page:page, groupId:pagingResponse.groupId, length:pagingResponse.length-1, page_num:5, pass:true});
}
// 오래된순
exports.paging_Old = async function (req, res) {
  const page = req.params.page;
  const groupId = req.session.groupId;

  const pagingResponse = await noticeProvider.pagingResult_Old(groupId, page);
  return res.render("../views/notice/noticeList_old.ejs", {title: '게시판 리스트',
   rows: pagingResponse, page:page, groupId:pagingResponse.groupId, length:pagingResponse.length-1, page_num:5, pass:true});
}

/**
 * API No. 2
 * API Name : 특정 공지글 조회 API
 * [GET] /app/groupId/notices/:noticeId
 */
exports.getNotice = async function (req, res) {

    /**
     * path variable : groupId, noticeId
     */
    const groupId = req.session.groupId;
    const noticeId = req.params.noticeId;

    const notice = await noticeProvider.noticeResult(groupId, noticeId);
    return res.render("../views/notice/noticeLook.ejs",{result:notice, postTitle:notice.postTitle});

};


/**
 * API No. 3
 * API Name : 새로운 공지글 등록 API
 * [POST] /app/createNotice
 * Body: userId, groupId, title, contents, fileLink, fileExten, fileName
 */

exports.makeNotice = async function (req, res) {

  return res.render("../views/notice/createNotice.ejs");
}

// 이제 파일도 저장하게 하고 userId, groupId 세션에서 가져와서 저장하게 하기
// exports.postNotice = async function (req, res) {
//     const {title, contents} = req.body;
//     console.log(req.file);
//     const file = req.file.filename;
//     // const userId = getUserId.getUserId;
//     const userId = 1;
//     // userId = req.body.userId;
//     // const groupId = req.body.groupId;
//     const groupId = 1;
//     const category = '공지사항';

//     console.log(file);

//     const noticeResponse = await noticeService.createNotice(
//       userId, groupId, title, contents, category, file );

//     return res.send(noticeResponse);  
// }

//파일 업로드 없이post
exports.postNotice = async function (req, res) {
  const {title, contents} = req.body;
  // console.log(req.file);
  // const file = req.file.filename;
  // const userId = getUserId.getUserId;
  const userId = req.session.userId;
  // userId = req.body.userId;
  // const groupId = req.body.groupId;
  const groupId = req.session.groupId;
  const category = '공지사항';

  // console.log(file);

  const noticeResponse = await noticeService.createNotice(
    userId, groupId, title, contents, category);

  return res.send(noticeResponse);  
}


// exports.postNotice = async function (req, res) {
  
//   const {userId, groupId, title, contents, fileLink, fileExten, fileName} = req.body;
  
//   const noticeResponse = await noticeService.createNotice(
//     userId, groupId, title, contents, fileLink, fileExten, fileName
//   );

//   return res.send(noticeResponse);
  
// }


/**
 * API No. 4
 * API Name : 공지글 수정 API
 * [PATCH] /app/:groupId/notices/:noticeId
 * Body: userId, groupId, postId, title, contents, fileLink, fileExten, fileName
 */
exports.patchNotice = async function (req, res) {
  const { groupId, noticeId, title, contents } = req.body;

  const editNoticeResult = await noticeService.editNotice(groupId, noticeId, title, contents);
  return res.send(editNoticeResult);
};








exports.inviteGroup = async function (req, res) {

  /**
   * path variable : groupId
   */
  // const groupId = req.params.groupId;

  // const noticeResponse = await noticeProvider.noticeListResult(groupId);
  // return res.send(response(baseResponse.SUCCESS, noticeResponse));
  return res.render("../views/group/groupInvite.ejs");

};










/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {

    /**
     * Body: email, password, nickname
     */
    const {email, password, nickname} = req.body;

    // 빈 값 체크
    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

    // 길이 체크
    if (email.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    // 기타 등등 - 추가하기


    const signUpResponse = await userService.createUser(
        email,
        password,
        nickname
    );

    return res.send(signUpResponse);
};