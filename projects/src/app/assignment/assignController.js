const assignProvider = require("./assignProvider");
const assignService = require("./assignService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");


/**
 * API No. 1
 * API Name : 날짜별 출석 조회 API
 * [GET] /app/members/:groupId/attendance/:date
 */
exports.getAssginment = async function (req, res) {

    /**
     * path variable : groupId
     */
    const groupId = req.params.groupId;

    const assginmentList = await assignProvider.assignmentList(groupId);
    // return res.send(response(baseResponse.SUCCESS, assginmentList));
    return res.render("../views/attendance/attend.ejs",attendListByDate);
};


