module.exports = function(app){
  const group = require('./groupController');

    // 1. 그룹 가입 API 
    app.post('/app/groups/member',group.enterGroup);

    //2. 그룹 조회 API
    app.get('/app/groups', group.getGroups);

    //3. 그룹 접속 API 
    app.get('/app/groups/views/:groupId', group.viewGroup);

    //4. 그룹 참여 링크 생성 API
    app.get('/app/groups/link', group.createLink);

    //5. 그룹 참여 링크로 가입 페이지 접속
    app.get('/app/group/groupjoins/:groupId',group.joinGroup);

    //6. 그룹 프로필 생성
    app.post('/app/group/profile',group.createProfile);

    // 7. 그룹 생성 API
    app.get('/app/createGroup', group.makeGroup);
    app.post('/app/group', group.createGroup);
   
};