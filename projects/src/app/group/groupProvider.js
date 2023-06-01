const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const groupDao = require("./groupDao");

// Provider: Read 비즈니스 로직 처리

exports.viewGroup = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const groupListResult = await groupDao.selectGroups(connection,userId);
    connection.release();

    return groupListResult;
};

exports.SearchGroupId = async function (sessionId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const groupIdResult = await groupDao.selectGroupId(connection,sessionId);
    connection.release();

    return groupIdResult;
};

exports.checkGroupId = async function (groupId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const groupIdResult = await groupDao.selectGroupmember(connection,groupId);
    connection.release();

    return groupIdResult;
};

exports.checkCode = async function (groupCode) {
    const connection = await pool.getConnection(async (conn) => conn);
    const groupCodeResult = await groupDao.selectGroupCode(connection,groupCode);
    connection.release();

    return groupCodeResult;
};