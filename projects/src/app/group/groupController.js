//그룹코드로 그룹 참여,그룹코드 입력 후 그룹 프로필사진,이름 입력 그룹 생성, 가입한 그룹 조회, 생성 그룹 조회, 그룹 접속, 그룹 탈퇴
const groupProvider = require("./groupProvider");
const groupService = require("./groupService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const getUserId = require("../login/loginController");
const { v4: uuidv4 } = require('uuid');




/**
 * API No. 1
 * API Name : 그룹 생성 API
 * [POST] /app/group
 */

// [GET] /app/createGroup
// 그룹 생성하는 페이지를 보여준다
exports.makeGroup = async function (req, res) {
  res.render("../views/group/createGroup.ejs");
}
// 생성한 그룹 정보를 db에 저장
exports.createGroup = async function (req, res) {

  const {groupName, groupType, groupImg, membershipFee} = req.body;
  const userId = 1;
    
  const createGroupResponse = await groupService.createGroup(userId, groupName, groupType, groupImg, membershipFee);
  
  return res.send(createGroupResponse);

};




// 1. 그룹 참여
/*
    1. 그룹 참여
    유형: POST
    Body: userId, 그룹 코드, 링크 (링크를 통해 groupId 추출)
    예외 처리: 그룹이 존재하는지, 그룹에 이미 참여했는지 확인, 코드가 맞는지 확인
 */

    exports.enterGroup = async function (req, res) {
        const userId = getUserId.getUserId;
        userId = req.body.userId;
        const link = req.body.link;
        const groupId = link.split("/")[1];
        const groupResponse = await groupService.postGroups(userId,groupId);

        return res.send(groupResponse);
    };

/*
    2. 그룹 조회
    유형: GET
*/
    exports.getGroups = async function (req,res){
        const userId = getUserId.getUserId;
        req.parmas.userId = userId;
        const groupsallRes = await groupProvider.viewGroup(userId);
        return res.send(groupsallRes);
    }

/*
    3. 그룹 접속 
    유형: POST
    body: userId, groupId
*/
    exports.viewGroup = async function (req,res){
        const userId = getUserId.getUserId;
        req.params.userId = userId;
        const groupId = req.parms.groupId;
        //그룹아이디에 속한 그룹장 == userId 인지를 불러오기 -> 저장
        const isGroupLeader = await groupService.confirmLeader(userId,groupId);
        req.session.groupId = groupId;
        req.session.isLeader = isGroupLeader;
        return res.send(isGroupLeader);
    }

/*
    4. 그룹 참여 링크 생성  
    유형: GET
    path variable : groupId
*/
    exports.createLink = async function (req,res){
        const inviteLink = uuidv4();
        const sessionId = req.sessionID;
        const getGroupBysession = await groupProvider.SearchGroupId(sessionId);
        const groupId = getGroupBysession;
        const linkGroupId = "http://" + inviteLink + "/" + groupId; 
        // 그룹Id을 가져오기! 
        return res.send(linkGroupId);
    }
/*
    5. 그룹Id 가져오기
    유형: GET
*/
exports.getGroupId = async function(req,res) {
    const sessionId = req.sessionID;
    const getGroupBysession = await groupProvider.SearchGroupId(sessionId);
    return res.send(getGroupBysession);
}
