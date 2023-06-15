// 공지사항 게시글 목록 조회 
async function noticeList(connection, groupId) {
  const noticeListQuery = `SELECT * FROM Post WHERE groupId = ? AND category = '공지사항';`;
  const [noticeListRows] = await connection.query(noticeListQuery, groupId);
  return noticeListRows;
}
// 페이징 연습
async function pagedNotice(connection, groupId) {
  const pagedNoticeQuery = "SELECT groupId, postId, userId, postTitle, postContent, date_format(updateAt, '%Y-%m-%d %H:%i:%s') updateAt, " +
    "date_format(createAt, '%Y-%m-%d %H:%i:%s') createAt FROM Post WHERE groupId = ? and category = '공지사항'";
  const [pagedNoticeRows] = await connection.query(pagedNoticeQuery, groupId);

  return pagedNoticeRows;
}

// 페이징 연습(커서 기반!! -- 최신순)
async function pagedNotice_Recent(connection, groupId, page) {
  let pagedNoticeQuery;
  const cursor = (page - 1) * 5; // 커서 값 계산

  if (page === 1) {
    pagedNoticeQuery = `
      SELECT groupId, postId, userId, postTitle, postContent,
        DATE_FORMAT(updateAt, '%Y-%m-%d %H:%i:%s') AS updateAt,
        DATE_FORMAT(createAt, '%Y-%m-%d %H:%i:%s') AS createAt,
        LPAD(CONCAT(DATE(createAt), ' ', TIME(createAt)), 20, '0') AS 'cursor'
      FROM Post
      WHERE groupId = ? AND category = '공지사항'
      ORDER BY createAt DESC
      LIMIT 5
    `;
  } else {
    pagedNoticeQuery = `
      SELECT groupId, postId, userId, postTitle, postContent,
        DATE_FORMAT(updateAt, '%Y-%m-%d %H:%i:%s') AS updateAt,
        DATE_FORMAT(createAt, '%Y-%m-%d %H:%i:%s') AS createAt,
        LPAD(CONCAT(DATE(createAt), ' ', TIME(createAt)), 20, '0') AS 'cursor'
      FROM Post
      WHERE groupId = ? AND category = '공지사항'
        AND createAt < (
          SELECT createAt
          FROM Post
          WHERE groupId = ? AND category = '공지사항'
          ORDER BY createAt DESC
          LIMIT ${cursor}, 1
        )
      ORDER BY createAt DESC
      LIMIT 5
    `;
  }
  

  const [pagedNoticeRows] = await connection.query(pagedNoticeQuery, [groupId, groupId, cursor]);
  return pagedNoticeRows;
}

// 페이징 연습(커서 기반!! -- 오래된순)
async function pagedNotice_Old(connection, groupId, page) {
  let pagedNoticeQuery;
  const cursor = (page - 1) * 5; // 커서 값 계산

  if (page === 1) {
    pagedNoticeQuery = `
      SELECT groupId, postId, userId, postTitle, postContent,
        DATE_FORMAT(updateAt, '%Y-%m-%d %H:%i:%s') AS updateAt,
        DATE_FORMAT(createAt, '%Y-%m-%d %H:%i:%s') AS createAt,
        LPAD(CONCAT(DATE(createAt), ' ', TIME(createAt)), 20, '0') AS 'cursor'
      FROM Post
      WHERE groupId = ? AND category = '공지사항'
      ORDER BY createAt ASC
      LIMIT 5
    `;
  } else {
    pagedNoticeQuery = `
      SELECT groupId, postId, userId, postTitle, postContent,
        DATE_FORMAT(updateAt, '%Y-%m-%d %H:%i:%s') AS updateAt,
        DATE_FORMAT(createAt, '%Y-%m-%d %H:%i:%s') AS createAt,
        LPAD(CONCAT(DATE(createAt), ' ', TIME(createAt)), 20, '0') AS 'cursor'
      FROM Post
      WHERE groupId = ? AND category = '공지사항'
        AND createAt > (
          SELECT createAt
          FROM Post
          WHERE groupId = ? AND category = '공지사항'
          ORDER BY createAt ASC
          LIMIT ${cursor}, 1
        )
      ORDER BY createAt ASC
      LIMIT 5
    `;
  }
  

  const [pagedNoticeRows] = await connection.query(pagedNoticeQuery, [groupId, groupId, cursor]);
  return pagedNoticeRows;
}



// 공지사항 게시글 조회 
async function selectNotice(connection, groupId, postId) {
  const selectNoticeQuery = `SELECT postTitle, postContent, date_format(createAt, '%Y-%m-%d %H:%i:%s') createAt
  FROM Post WHERE groupId = ? AND category = '공지사항' AND postId = ?;`;
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
  pagedNotice_Recent,
  pagedNotice_Old,
};
