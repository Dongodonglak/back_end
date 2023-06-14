const mainProvider = require("./mainProvider");
const mainService = require("./mainService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const getUserId = require("../login/loginController");
const regexEmail = require("regex-email");
const {emit} = require("nodemon");

// 유저아이디 가져오기
// 1. post
// const userId = getUserId.getUserId;
// userId = req.body.userId;

// 2. get
// const userId = getUserId.getUserId;
// req.parmas.userId = userId;



// 메인 화면 불러오기
exports.main = async function (req, res) {

  /**
   * path variable : groupId
   */
  // [GET] /app/:groupId/main
  const groupId = req.params.groupId;
  const userId = 1;

  const mainResponse = await mainProvider.mainResult(groupId, userId);

  return res.render("../views/main/main.ejs", {result:mainResponse});
};

