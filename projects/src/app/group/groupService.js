const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const groupProvider = require("./groupProvider");
const groupDao = require("./groupDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createUser = async function (email, password, nickname) {
    try {
        // 이메일 중복 확인
        const emailRows = await userProvider.emailCheck(email);
        if (emailRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);

        // 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const insertUserInfoParams = [email, hashedPassword, nickname];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.confirmLeader = async function (userId,groupId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const isgroupResult = await groupDao.selectGroupLeader(connection,userId,groupId);
        connection.release();
        return response(isgroupResult);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.postGroups = async function (userId,groupId,groupCode) {
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        const checkGroupResult = await groupProvider.checkGroupId(connection,userId,groupId);
        if(checkGroupResult) return errResponse(baseResponse.GROUP_EXIST_MEMBER);
        const checkGroupCode = await groupDao.selectGroupCode(connection,groupCode);
        return checkGroupCode;

    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}