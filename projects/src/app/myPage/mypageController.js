const mypageProvider = require("./mypageProvider");
const mypageService = require("./mypageService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 0
 * API Name : 마이페이지 조회 API
 * [GET] /app/:groupId/:userId/mypage
 */
exports.getMypage = async function (req, res) {

    /**
     * path variable : groupId, userId
     */
    const groupId = req.params.groupId;
    const userId = req.params.userId;

    const nameListByUser = await mypageProvider.nameUserList(groupId, userId); // 1. get user name
    const postsByUser = await mypageProvider.postsUser(groupId, userId); // 2. get num of posts
    const likesByUser = await mypageProvider.likesUser(groupId, userId); // 3. get num of likes
    const commentByUser = await mypageProvider.commentsUser(groupId, userId); // 4. get num of comments
    const avatarByUser = await mypageProvider.avatarUser(groupId, userId); // 8. get profile img
    const rewardPntByUser = await mypageProvider.rewardPntUser(groupId, userId); // 10. get reward point
    const penaltyPntByUser = await mypageProvider.penaltyPntUser(groupId, userId); // 11. get penalty point
    const totalPntByUser = await mypageProvider.totalPntUser(groupId, userId); // 12. get total point
    
    // return res.send(response(baseResponse.SUCCESS, nameListByUser[userId]));
    return res.render("../views/myPage/mypage.ejs", {
        avatar:avatarByUser[0],
        name:nameListByUser,
        cntPost:postsByUser,
        cntLike:likesByUser[0],
        cntComment:commentByUser[0],
        rewardPnt:rewardPntByUser[0],
        penaltyPnt:penaltyPntByUser[0],
        totalPnt:totalPntByUser[0]
    });
};

/**
 * API No. 1
 * API Name : 유저 닉네임 조회 API
 * [GET] /app/:groupId/:userId/me/name
 */
exports.getName = async function (req, res) {

    /**
     * path variable : groupId, userId
     */
    const groupId = req.params.groupId;
    const userId = req.params.userId;

    const nameListByUser = await mypageProvider.nameUserList(groupId, userId);
    
    // return res.send(response(baseResponse.SUCCESS, nameListByUser[userId]));
    return res.render("../views/myPage/mypage.ejs", {name:nameListByUser[userId]});
};

/**
 * API No. 2
 * API Posts : 유저별 게시글 수 조회 API
 * [GET] /app/:groupId/:userId/me/posts
 */
exports.getPosts = async function (req, res) {

    /**
     * path variable : groupId, userId
     */
    const groupId = req.params.groupId;
    const userId = req.params.userId;

    const postsByUser = await mypageProvider.postsUser(groupId, userId); // get num of posts
    
    return res.send(response(baseResponse.SUCCESS, postsByUser));
    return res.render("../views/myPage/mypage.ejs", {cntPost:postsListByUser[userId]});
};

/**
 * API No. 3
 * API Posts : 유저별 좋아요 수 조회 API
 * [GET] /app/:groupId/:userId/me/likes
 */
exports.getLikes = async function (req, res) {

    /**
     * path variable : groupId, userId
     */
    const groupId = req.params.groupId;
    const userId = req.params.userId;

    const likesByUser = await mypageProvider.likesUser(groupId, userId); // get num of likes
    
    return res.send(response(baseResponse.SUCCESS, likesByUser));
    return res.render("../views/myPage/mypage.ejs", {cntLike:likesListByUser[userId]});
};

/**
 * API No. 4
 * API Posts : 유저별 댓글 수 조회 API
 * [GET] /app/:groupId/:userId/me/comments
 */
exports.getComments = async function (req, res) {

    /**
     * path variable : groupId, userId
     */
    const groupId = req.params.groupId;
    const userId = req.params.userId;

    const commentByUser = await mypageProvider.commentsUser(groupId, userId); // get num of comments
    
    return res.send(response(baseResponse.SUCCESS, commentByUser));
};

// /**
//  * API No. 6
//  * API Posts : 유저별 닉네임 수정 API
//  * [PUT] /app/:groupId/:userId/me/name
//  */
// exports.updateName = async function (req, res) {

//     /**
//      * path variable : groupId, userId
//      */
//     const groupId = req.params.groupId;
//     const userId = req.params.userId;

//     const commentByUser = await mypageProvider.commentsUser(groupId, userId); // get num of comments
    
//     return res.send(response(baseResponse.SUCCESS, commentByUser));
// };

/**
 * API No. 8
 * API Posts : 유저별 프로필 사진 조회 API
 * [GET] /app/:groupId/:userId/me/avatar
 */
exports.getAvatar = async function (req, res) {

    /**
     * path variable : groupId, userId
     */
    const groupId = req.params.groupId;
    const userId = req.params.userId;

    const avatarByUser = await mypageProvider.avatarUser(groupId, userId); // get profile img
    
    return res.send(response(baseResponse.SUCCESS, avatarByUser));
};

/**
 * API No. 10
 * API Posts : 유저별 상점 조회 API
 * [GET] /app/:groupId/:userId/me/reward-pnt
 */
exports.getRewardPnt = async function (req, res) {

    /**
     * path variable : groupId, userId
     */
    const groupId = req.params.groupId;
    const userId = req.params.userId;

    const rewardPntByUser = await mypageProvider.rewardPntUser(groupId, userId); // get reward point
    
    return res.send(response(baseResponse.SUCCESS, rewardPntByUser));
};

/**
 * API No. 11
 * API Posts : 유저별 벌점 조회 API
 * [GET] /app/:groupId/:userId/me/penalty-pnt
 */
exports.getPenaltyPnt = async function (req, res) {

    /**
     * path variable : groupId, userId
     */
    const groupId = req.params.groupId;
    const userId = req.params.userId;

    const penaltyPntByUser = await mypageProvider.penaltyPntUser(groupId, userId); // get penalty point
    
    return res.send(response(baseResponse.SUCCESS, penaltyPntByUser));
};

/**
 * API No. 12
 * API Posts : 유저별 상벌점 합계 조회 API
 * [GET] /app/:groupId/:userId/me/total-pnt
 */
exports.getTotalPnt = async function (req, res) {

    /**
     * path variable : groupId, userId
     */
    const groupId = req.params.groupId;
    const userId = req.params.userId;

    const totalPntByUser = await mypageProvider.totalPntUser(groupId, userId); // get total point
    
    return res.send(response(baseResponse.SUCCESS, totalPntByUser));
};