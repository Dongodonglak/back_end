// 1. 유저 닉네임 조회 
async function selectName(connection, groupId, userId) {
    const selectNameListQuery = `
    SELECT *
    FROM JoinGroup 
    WHERE groupId = ? AND userId = ?;
                `;
    const [nameRows] = await connection.query(selectNameListQuery, [groupId, userId]);
    return nameRows;
}


// 2. 유저별 게시글 수 조회
async function selectPosts(connection) {
  const selectPostsQuery = `
  SELECT count(*)
  FROM Post, User
  WHERE Post.userId = User.userId;
                `;
  const posts = await connection.query(selectPostsQuery);
  return posts;
}

// 3. 유저별 좋아요 수 조회
async function selectLikes(connection) {
  const selectLikesQuery = `
  SELECT count(likes)
  FROM Post, User
  WHERE Post.userId = User.userId;
                `;
  const likes = await connection.query(selectLikesQuery);
  return likes;
}

// 4. 유저별 댓글 수 조회
async function selectComments(connection) {
  const selectCommentsQuery = `
  SELECT count(*)
  FROM Comment, User
  WHERE Comment.userId = User.userId;
                `;
  const comments = await connection.query(selectCommentsQuery);
  return comments;
}

// // 6. 유저별 닉네임 수정
// async function updateName(connection) {
//   const updateNameQuery = `
//   SELECT count(*)
//   FROM Comment, User
//   WHERE Comment.userId = User.userId;
//                 `;
//   const comments = await connection.query(updateNameQuery);
//   return comments;
// }

// 8. 유저별 프로필 사진 조회
async function selectAvatar(connection) {
  const selectAvatarQuery = `
  SELECT profileImg
  FROM JoinGroup, User
  WHERE JoinGroup.userId = User.userId;
                `;
  const avatar = await connection.query(selectAvatarQuery);
  return avatar;
}

// 10. 유저별 상점 조회
async function selectRewardPnt(connection) {
  const selectRewardPntQuery = `
  SELECT bonusPoint
  FROM JoinGroup, User
  WHERE JoinGroup.userId = User.userId;
                `;
  const rewardPnt = await connection.query(selectRewardPntQuery);
  return rewardPnt;
}

// 11. 유저별 벌점 조회
async function selectPenaltyPnt(connection) {
  const selectPenaltyPntQuery = `
  SELECT minusPoint
  FROM JoinGroup, User
  WHERE JoinGroup.userId = User.userId;
                `;
  const penaltyPnt = await connection.query(selectPenaltyPntQuery);
  return penaltyPnt;
}

// 12. 유저별 상벌점 합계 조회
async function selectTotalPnt(connection) {
  const selectTotalPntQuery = `
  SELECT bonusPoint - minusPoint
  FROM JoinGroup, User
  WHERE JoinGroup.userId = User.userId;
                `;
  const totalPnt = await connection.query(selectTotalPntQuery);
  return totalPnt;
}

module.exports = {
  selectName, selectPosts, selectLikes, selectComments, selectAvatar, selectRewardPnt, selectPenaltyPnt,
   selectTotalPnt,
};
