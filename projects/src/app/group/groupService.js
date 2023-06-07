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





// 그룹 생성
exports.createGroup = async function (userId, groupName, groupType, groupImg, membershipFee) {
  try {
    const createGroupParams = [groupName, groupType, groupImg, parseInt(membershipFee)];
    const connection = await pool.getConnection(async (conn) => conn);

    let groupId; // 그룹 ID를 저장할 변수 선언

    try {
      await connection.beginTransaction(); // 트랜잭션 시작

      // 그룹 생성
      const createGroupResult = await groupDao.insertGroup(connection, createGroupParams);
      groupId = createGroupResult.insertId; // 생성된 그룹의 ID 저장

      // 그룹에 가입
      await groupDao.joinGroup(connection, userId, groupId);

      await connection.commit(); // 트랜잭션 커밋
    } catch (err) {
      await connection.rollback(); // 트랜잭션 롤백
      throw err; // 에러 다시 던지기
    } finally {
      connection.release(); // 커넥션 반환
    }

    console.log(`추가된 Group : ${groupId}`);

    return response(baseResponse.SUCCESS);
  } catch (err) {
    console.log(err);
    return errResponse(baseResponse.DB_ERROR);
  }
};