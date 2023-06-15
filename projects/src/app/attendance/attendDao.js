// 출결 조회 
async function selectAttend(connection, groupId, scheduleId) {
  const selectAttendListQuery = `
  SELECT *
  FROM Attendance
  INNER JOIN JoinGroup ON Attendance.userId = JoinGroup.userId AND Attendance.groupId = JoinGroup.groupId
  WHERE Attendance.groupId = ? AND scheduleId = ?;
                `;
  const [attendRows] = await connection.query(selectAttendListQuery, [groupId, scheduleId]);
  return attendRows;
}

// 출결 정보 저장
async function updateAttendance (userId, status) {
  try {
    const updateAttendanceQuery = `
      UPDATE Attendance
      SET attendStatus = ?
      WHERE userId = ?;
                `;
    
    const updateAttendanceParams = [status, userId];

    const updateResult = await connection.query(updateAttendanceQuery, updateAttendanceParams);
    return updateResult;
  } catch (error) {
    console.error('DB 업데이트 오류:', error);
    throw error;
  }
};


module.exports = {
  selectAttend,
  updateAttendance,
};
