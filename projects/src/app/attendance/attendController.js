const attendProvider = require("./attendProvider");
const attendService = require("./attendService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 1
 * API Name : 날짜별 출석 조회 API
 * [GET] /app/members/:groupId/attendance/:date
 */
exports.getAttendance = async function (req, res) {

    /**
     * path variable : groupId, date
     */
    const groupId = req.params.groupId;
    const date = req.params.date;

    const attendListByDate = await attendProvider.attendUserList(groupId, date);
    return res.send(response(baseResponse.SUCCESS, attendListByDate));
    return res.send(response(baseResponse.SUCCESS, attendListByDate.userId));
    return res.send(response(baseResponse.SUCCESS, {
        userId: attendListByDate.userId,
        nickname: attendListByDate.nickname,
        profileImg: attendListByDate.profileImg,
        attendanceTime: attendListByDate.attendanceTime
      }));
    // return res.render("../views/attendance/attendance.ejs",{result:attendListByDate[0]});

};

