// const express = require('./config/express');
// const {logger} = require('./config/winston');

// const port = 3000;
// express().listen(port);


// logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);
//여기까지가 기존 코드

//다른 코드 복붙
const express = require('express');
const path = require('path');
const { pool } = require("./config/database");

const PORT = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve() + "/views");

const parentDirectory = path.dirname(__filename) + '/../';

// 정적 파일 제공 경로 설정
// app.use(express.static(path.join(parentDirectory, 'public')));
// app.use(express.static(path.resolve() + "/public"));
// app.use(express.urlencoded({ extended: false }));
const pathComp= require("express-static");
app.use('/public', pathComp('public'));

// 라우트 등록
// app.get("/app/:groupId/notices", async (req, res) => {
//   try {
//     const query = "SELECT * from Post";
//     const [rows, fields] = await pool.execute(query);
//     res.render("notice", { data: rows });
//   } catch (error) {
//     res.send(error);
//   }
// });

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//회원가입
const user = require('./src/app/users/userController');
app.get('/app/users/signup', (req, res) => {
  res.render('signup');
});
app.post('/app/users/signup', user.postUsers);

//유저조회
app.get('/app/users',user.getUsers);


app.get("/edit/:id", async (req, res) => {
  try {
    const ID = req.params.id;
    const query = "select * from Post where postId = ?";
    const [rows, fields] = await pool.execute(query, [ID]);
    if (rows.length === 0) {
      res.send("찾으시는 페이지가 존재하지 않습니다.");
    } else {
      res.render("Edit", { id: ID, Data: rows[0] });
    }
  } catch (error) {
    res.send(error);
  }
});

app.get("/create", (req, res) => {
  res.render("Create");
});

app.post("/delete", async (req, res) => {
  try {
    const id = req.body.id;
    console.log(id);
    const query = "delete from Post where postId = ?";
    await pool.execute(query, [id]);
    res.redirect("/main");
  } catch (error) {
    console.log(error);
  }
});

app.post("/edit", async (req, res) => {
  try {
    const Title = req.body.Title;
    const Article = req.body.Article;
    const ID = req.body.id;
    const query = `
      update Post set title = ?, 
      content = ?, 
      createAt = DATE_FORMAT(now(), '%Y-%m-%d') where postId = ?
    `;
    await pool.execute(query, [Title, Article, ID]);
    res.redirect("/main");
  } catch (error) {
    console.log(error);
  }
});

app.post("/create", async (req, res) => {
  try {
    const Title = req.body.Title;
    const Article = req.body.Article;
    const query = `
      insert into Post(title , content , createAt)
      values(?,?,DATE_FORMAT(now(), '%Y-%m-%d'))
    `;
    await pool.execute(query, [Title, Article]);
    res.redirect("/main");
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
