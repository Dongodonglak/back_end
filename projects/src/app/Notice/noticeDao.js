// 공지사항 게시글 목록 조회 
async function noticeList(connection, groupId) {
  const noticeListQuery = `SELECT * FROM Post WHERE groupId = ? AND category = '공지사항';`;
  const [noticeListRows] = await connection.query(noticeListQuery, groupId);
  return noticeListRows;
}


// 공지사항 게시글 조회 
async function selectNotice(connection, groupId, postId) {
  const selectNoticeQuery = `SELECT * FROM Post WHERE groupId = ? AND category = '공지사항' AND postId = ?;`;
  const [noticeRows] = await connection.query(selectNoticeQuery, [groupId, postId]);
  return noticeRows;
}




// 공지글 작성
// userId, groupId, title, contents, fileLink, fileExten, fileName

async function insertNotice(connection, insertNoticeParams) {
  const insertNoticeQuery = `
                  INSERT INTO Post
                  (userId, groupId, postTitle, postContent, category)
                  VALUES (?, ?, ?, ?, ?)
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
};
