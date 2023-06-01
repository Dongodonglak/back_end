const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const noticeDao = require("./noticeDao");

// Provider: Read 비즈니스 로직 처리

// 공지글 목록 조회
exports.noticeListResult = async function (groupId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const noticeListResult = await noticeDao.noticeList(connection, groupId);
  connection.release();

  return noticeListResult;
};

// 특정 공지글 조회
exports.noticeResult = async function (groupId, noticeId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const noticeSelectResult = await noticeDao.selectNotice(connection, groupId, noticeId);
    connection.release();

    return noticeSelectResult;
};




exports.makeNotice = async function (groupId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const noticeResult = await noticeDao.makeNotice(connection, groupId);
  connection.release();

  return noticeResult;
}
