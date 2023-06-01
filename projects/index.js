const express = require('./config/express');
const {logger} = require('./config/winston');
const app = express();

const port = 3001;
express().listen(port);
app.set("view engine", "ejs");

logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);
//여기까지가 기존 코드



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

// app.get("/edit/:id", async (req, res) => {
//   try {
//     const ID = req.params.id;
//     const query = "select * from Post where postId = ?";
//     const [rows, fields] = await pool.execute(query, [ID]);
//     if (rows.length === 0) {
//       res.send("찾으시는 페이지가 존재하지 않습니다.");
//     } else {
//       res.render("Edit", { id: ID, Data: rows[0] });
//     }
//   } catch (error) {
//     res.send(error);
//   }
// });

// app.get("/create", (req, res) => {
//   res.render("Create");
// });

// app.post("/delete", async (req, res) => {
//   try {
//     const id = req.body.id;
//     console.log(id);
//     const query = "delete from Post where postId = ?";
//     await pool.execute(query, [id]);
//     res.redirect("/main");
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/edit", async (req, res) => {
//   try {
//     const Title = req.body.Title;
//     const Article = req.body.Article;
//     const ID = req.body.id;
//     const query = `
//       update Post set title = ?, 
//       content = ?, 
//       createAt = DATE_FORMAT(now(), '%Y-%m-%d') where postId = ?
//     `;
//     await pool.execute(query, [Title, Article, ID]);
//     res.redirect("/main");
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/create", async (req, res) => {
//   try {
//     const Title = req.body.Title;
//     const Article = req.body.Article;
//     const query = `
//       insert into Post(title , content , createAt)
//       values(?,?,DATE_FORMAT(now(), '%Y-%m-%d'))
//     `;
//     await pool.execute(query, [Title, Article]);
//     res.redirect("/main");
//   } catch (error) {
//     res.send(error);
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });
