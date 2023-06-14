module.exports = function(app){
  const main = require('./mainController');

  // 메인페이지
  app.get('/app/main/:groupId', main.main);
};

