// 게시글 부분
const Board = require("../models/board.js");



//1. 모든 과제 게시글 조회

exports.getHomework = async (req,res) => {
    const {groupId} = req.params;
try{    
    const allHomeworks = await Board.showHomeworks(groupId);
    res.render("index",{result:allHomeworks});
} catch (error) {
    console.error(error);
    return res.status(500).send("서버 오류");
  }
};



//2. 특정 과제 게시글 조회
exports.getSomeHomework = async (req,res) => {
    const {groupId,assignmentId} = req.params;
try{
    const HomeworkBysome = await Board.showSomeHomework(groupId);
    res.render("index",{result:HomeworkBysome});
} catch (error) {
    console.error(error);
    return res.status(500).send("서버 오류");
  }
};



//3. 새로운 과제 게시글 등록
exports.postHomework = async function (req, res) {

    /**
     * Body: groupId,userId,attendtimestamp,date
     */
    const {userName,assignmentId,title,registDate,endDate,srtDate,contents,fileLink,fileExten,fileName,heartCnt} = req.body;


    const HomeworkResponse = await Board.createHomework(
        userName,
        assignmentId,
        title,
        registDate,
        endDate,
        srtDate,
        contents,
        fileLink,
        fileExten,
        fileName,
        heartCnt
    );

    res.render("index",{HomeworkResponse});
};








