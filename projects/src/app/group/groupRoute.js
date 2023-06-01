module.exports = function(app){
  const group = require('./groupController');

  // 1. 그룹 생성 API
  app.post('/app/group', group.createGroup);
    // 1. 그룹 가입 API 
    app.post('/app/groups/member',group.enterGroup);

    //2. 그룹 조회 API
    app.get('/app/groups', group.getGroups);

    //3. 그룹 접속 API 
    app.post('/app/groups/:groupId', group.viewGroup);

    //4. 그룹 참여 링크 생성 API
    app.get('/app/groups/:groupId', group.createLink);

    //5. 그룹 ID 가져오기 API
    app.get('/app/groups/:groupId', group.getGroupId);
};