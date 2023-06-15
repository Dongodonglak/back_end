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
// 페이징 연습
exports.pagingResult = async function (groupId) {
  const connection = await pool.getConnection(async (conn) => conn);

  const pagingResult = await noticeDao.pagedNotice(connection, groupId);
  connection.release();

  return pagingResult;
}
// 페이징 연습 - 최신순 cursor
exports.pagingResult_Recent = async function (groupId, page) {
  const connection = await pool.getConnection(async (conn) => conn);

  const pagingResult = await noticeDao.pagedNotice_Recent(connection, groupId, page);
  connection.release();

  return pagingResult;
}
// 페이징 연습 - 오래된순 cursor
exports.pagingResult_Old = async function (groupId, page) {
  const connection = await pool.getConnection(async (conn) => conn);

  const pagingResult = await noticeDao.pagedNotice_Old(connection, groupId, page);
  connection.release();

  return pagingResult;
}



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
