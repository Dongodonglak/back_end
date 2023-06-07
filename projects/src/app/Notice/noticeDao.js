// 공지사항 게시글 목록 조회 
async function noticeList(connection, groupId) {
  const noticeListQuery = `SELECT * FROM Post WHERE groupId = ? AND category = '공지사항';`;
  const [noticeListRows] = await connection.query(noticeListQuery, groupId);
  return noticeListRows;
}
// 페이징 연습
async function pagedNotice(connection, groupId) {
  // const offset = (page - 1) * 5;
  const pagedNoticeQuery = "SELECT groupId, postId, userId, postTitle, postContent, date_format(updateAt, '%Y-%m-%d %H:%i:%s') updateAt, " +
    "date_format(createAt, '%Y-%m-%d %H:%i:%s') createAt FROM Post WHERE groupId = ? and category = '공지사항'";
  const [pagedNoticeRows] = await connection.query(pagedNoticeQuery, groupId);

  return pagedNoticeRows;
}



// 공지사항 게시글 조회 
async function selectNotice(connection, groupId, postId) {
  const selectNoticeQuery = `SELECT * FROM Post WHERE groupId = ? AND category = '공지사항' AND postId = ?;`;
  const [noticeRows] = await connection.query(selectNoticeQuery, [groupId, postId]);
  return noticeRows;
}




// 공지글 작성
// userId, groupId, title, contents, fileLink, fileExten, fileName

// async function insertNotice(connection, insertNoticeParams) {
//   const insertNoticeQuery = `
//           INSERT INTO Post
//           (userId, groupId, postTitle, postContent, category, file)
//           VALUES (?, ?, ?, ?, ?, ?);
//           `;

//   const insertNoticeRow = await connection.query(
//     insertNoticeQuery,
//     insertNoticeParams
//   );
//   return insertNoticeRow;
// }

// 파일 업로드 없이
async function insertNotice(connection, insertNoticeParams) {
  const insertNoticeQuery = `
          INSERT INTO Post
          (userId, groupId, postTitle, postContent, category)
          VALUES (?, ?, ?, ?, ?);
          `;

  const insertNoticeRow = await connection.query(
    insertNoticeQuery,
    insertNoticeParams
  );
  return insertNoticeRow;
}







// 공지글 수정
async function updateNotice(connection, updateNoticeParams) {
  const updateNoticeQuery = `
  UPDATE Post
  SET postTitle = ?, postContent = ?
  WHERE groupId = ? AND postId = ?;
`;

  const updateNoticeRow = await connection.query(updateNoticeQuery, updateNoticeParams);
  return updateNoticeRow;
}





module.exports = {
  selectNotice,
  noticeList,
  insertNotice,
  updateNotice,
  pagedNotice,
};
