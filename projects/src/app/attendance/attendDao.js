// 출결 조회 
async function selectAttend(connection, groupId, scheduleId) {
  const selectAttendListQuery = `
  SELECT *
  FROM Attendance
  JOIN JoinGroup ON Attendance.groupId = JoinGroup.groupId
  WHERE Attendance.groupId = ? AND scheduleId IS NULL;
                `;
  const [attendRows] = await connection.query(selectAttendListQuery, [groupId, scheduleId]);
  return attendRows;
}

module.exports = {
  selectAttend,
};