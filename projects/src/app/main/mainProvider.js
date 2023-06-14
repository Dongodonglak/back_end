const { pool } = require("../../../config/database");
const mainDao = require("./mainDao");



// Provider: Read 비즈니스 로직 처리

// 그룹 이름, 사용자 이름 불러오기
exports.mainResult = async function (groupId, userId) {
  const group = groupId;
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    let Id; // 그룹 Id를 저장할 변수 선언

    try {
      await connection.beginTransaction(); // 트랜잭션 시작

      // 그룹 이름 불러오기
      const groupNameResult = await mainDao.getGroupName(connection, group);
      Id = groupNameResult.groupId; // 생성된 그룹의 Id 저장

      // 사용자 이름 불러오기
      await mainDao.getUserName(connection, Id, userId);

      await connection.commit(); // 트랜잭션 커밋
    } catch (err) {
      await connection.rollback(); // 트랜잭션 롤백
      throw err; // 에러 다시 던지기
    } finally {
      connection.release(); // 커넥션 반환
    }

    console.log(`로그인한 Group : ${Id}`);

    return response(baseResponse.SUCCESS);
  } catch (err) {
    console.log(err);
    return errResponse(baseResponse.DB_ERROR);
  }

  return mainResult;

};
