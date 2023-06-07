// 그룹 생성
async function insertGroup(connection, groupName, groupType, groupImg, membershipFee) {
  const createGroupQuery = `
    INSERT INTO myGroup(groupName, groupType, groupImg, membershipFee)
    VALUES (?, ?, ?, ?);
  `;
  const [groupRows] = await connection.query(createGroupQuery, groupName, groupType, groupImg, membershipFee);
  return groupRows;
}

// 그룹에 가입
async function joinGroup(connection, userId, groupId) {
  const joinGroupQuery = `
    INSERT INTO JoinGroup (userId, groupId, isManager)
    VALUES (?, ?, 1);
  `;
  const [joinRows] = await connection.query(joinGroupQuery, [userId, groupId]);
  return joinRows;
}

// 그룹 조회 
async function selectGroups(connection, userId) {
    const selectGroupListQuery = `
        SELECT userId, groupName, groupType
        FROM myGroup
        WHERE userId = ?;
      `;
    const [groupRows] = await connection.query(selectGroupListQuery, userId);
    return groupRows;
  }
  
// 운영진 여부 확인
async function selectGroupLeader(connection,userId,groupId) {
    const selectGroupLeaderQuery = `
        SELECT membershipFee
        FROM myGroup
        WHERE userId = ? AND groupId = ?;
      `;
    const [isLeaderRows] = await connection.query(selectGroupLeaderQuery,userId,groupId);
    return isLeaderRows;
  }
  

// 그룹 아이디 가져오기
async function selectGroupId(connection, sessionId) {
    const selectGroupIdQuery = `
        SELECT JSON_EXTRACT(data, '$.groupId') AS userId
        FROM sessions
        WHERE session_id = ?;
      `;
    const [GroupIdRows] = await connection.query(selectGroupIdQuery,sessionId);
    return GroupIdRows;
  }
  
// 그룹에 가입한 참여자인지 확인 
async function selectGroupmember(connection, userId, groupId) {
    const selectGroupmemQuery = `
        SELECT userId
        FROM joinGroup
        WHERE userId = ? AND groupId = ?;
      `;
    const [memberRows] = await connection.query(selectGroupmemQuery,userId,groupId);
    return memberRows;
  }

// 그룹 코드가 맞는지 확인 
async function selectGroupCode(connection,groupCode) {
    const selectCodeQuery = `
        SELECT groupId
        FROM myGroup
        WHERE groupCode = ?;
      `;
    const [GroupCodeRows] = await connection.query(selectCodeQuery,groupCode);
    return GroupCodeRows;
  }
  
//그룹 가입
async function insertGroupUser(connection,groupId,userId,profileImg,nickname) {
    const insertGroupUserQuery = `
        INSERT INTO JoinGroup(groupId,userId,profileImg,nickname,isManager)
        VALUES(?,?,?,?,0)
    `;
    const [groupUserRows] = await connection.query(insertGroupUserQuery, groupId,userId,profileImg,nickname);
    return groupUserRows;
}


  module.exports = {
    selectGroups,
    selectGroupLeader,
    selectGroupId,
    selectGroupmember,
    selectGroupCode,
    insertGroupUser,
    insertGroup,
    joinGroup,
  };
  