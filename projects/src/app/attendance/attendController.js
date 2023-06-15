const attendProvider = require("./attendProvider");
const attendService = require("./attendService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 1
 * API Name : 날짜별 출석 조회 API
 * [GET] /app/members/:groupId/attendance/:scheduleId
 */
exports.getAttendance = async function (req, res) {

    /**
     * path variable : groupId, scheduleId
     */
    const groupId = req.params.groupId;
    const scheduleId = req.params.scheduleId;

    const attendListByDate = await attendProvider.attendUserList(groupId, scheduleId);
    // return res.send(response(baseResponse.SUCCESS, attendListByDate));
    return res.render("../views/attendance/attendance.ejs",{result:attendListByDate});

};

/**
 * API No. 2
 * API Name : 출석 정보 저장 API
 * [POST] /app/members/:groupId/attendance/:scheduleId
 */
exports.updateAttendance = async function (req, res) {
  const { userIds, status } = req.body;
  try {
    for (const userId of userIds) {
      await attendService.updateAttendance(userId, status);
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('업데이트 오류:', error);
    return res.status(500).json({ success: false, error: '업데이트 실패' });
  }
};

