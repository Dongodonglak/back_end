// 출결 조회 
async function selectAttend(connection) {
  const selectAttendListQuery = `
  SELECT JoinGroup.userId, JoinGroup.nickname, JoinGroup.profileImg, Attendance.attendanceTime
  FROM Attendance, JoinGroup
  WHERE Attendance.groupId = JoinGroup.groupId AND Attendance.userId = JoinGroup.userId AND JoinGroup.groupId = 1 AND Attendance.scheduleId = 1;
                `;
  const [attendRows] = await connection.query(selectAttendListQuery);
  return attendRows;
}


module.exports = {
  selectAttend,
};
