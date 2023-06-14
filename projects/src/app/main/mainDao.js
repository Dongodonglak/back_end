// 그룹 이름 불러오기
async function getGroupName(connection, groupId) {
  const mainPageQuery = `SELECT groupName, groupId FROM myGroup WHERE groupId = ?;`;
  const [mainPageRows] = await connection.query(mainPageQuery, groupId);
  return mainPageRows;
}
//사용자 이름 불러오기
async function getUserName(connection, groupId, userId) {
  const mainPageQuery = `SELECT nickname FROM JoinGroup WHERE groupId = ? AND userId = ?;`;
  const [mainPageRows] = await connection.query(mainPageQuery, groupId, userId);
  return mainPageRows;
}



module.exports = {
  getGroupName,
  getUserName,
};
