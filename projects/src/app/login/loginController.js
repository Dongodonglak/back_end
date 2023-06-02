const loginService = require("./loginService");
const loginProvider = require("./loginProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const { sign } = require("crypto");


/**
 
API No. 1
API Name : 로그인 API
[POST] /app/login
body : email, passsword
*/

exports.login = async function (req, res) {

    const {email,password} = req.body;
    const userId = await loginService.postSignIn(email, password);
    if(userId!== baseResponse.SIGNIN_EMAIL_WRONG && userId!== baseResponse.SIGNIN_PASSWORD_WRONG){
        req.session.userId = userId;
    }
    res.send(response(baseResponse.SUCCESS,userId));
};

exports.makeLogin = async function (req, res) {

    return res.render("../views/login/login.ejs");
  }

exports.getUserId = async function (req,res){

    const sessionId = req.sessionID;
    console.log(sessionId);
    sessionId = req.params.sessionId;
    const userIdResponse = await loginProvider.returnUserId(sessionId);
    if(userIdResponse.length==0) return res.send(response(baseResponse.DB_ERROR));
    //   return res.send(response(baseResponse.SUCCESS,userIdResponse));
    return userIdResponse;
}