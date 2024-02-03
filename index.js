const express = require("express"); //require to call lib in node_modules
const mongoose = require("mongoose");
const app = express(); //app is the full application or web server
const Article = require("./models/Article");
mongoose
  .connect(
    "mongodb+srv://sherif:sh12341234@cluster0.zagvsra.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected Successfully");
  })
  .catch((error) => {
    console.log("error with connecting with DB", error);
  });
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));
app.get("/hello", (req, res) => {
  res.send("hello"); // لو ال مستخدم زار هذا ال رابط ابعت ليه hello
}); //end point

app.get("/test", (req, res) => {
  let numbers = "";
  for (let i = 0; i <= 100; i++) {
    numbers += i + " - ";
  }
  res.send(`the Numbers are: ${numbers}`);
});

app.post("/addComment", (req, res) => {
  res.send("post request on add comment");
});

app.put("/putRequest", (req, res) => {
  res.send("put request");
});

app.delete("/deleteRequest", (req, res) => {
  res.send("delete request");
});

app.get("/findSummation/:number1/:number2", (req, res) => {
  //: path parameter (something changeable)
  let num1 = req.params.number1;
  let num2 = req.params.number2;
  let total = Number(num1) + Number(num2);
  console.log(req.params);
  //res.send(`the numbers are: ${num1} and ${num2}`);
  res.send(`the total is: ${total}`);
});

app.get("/sayHello", (req, res) => {
  //text res
  //Body and query ?age=50
  console.log(req.body);
  console.log(req.query);
  res.send(`Hello ${req.body.name}, Age is ${req.query.age}`);
});

app.get("/sayHello2", (req, res) => {
  //json res
  res.json({
    name: req.body.name,
    age: req.query.age,
    language: "Arabic",
  });
});

app.get("/sayHello3", (req, res) => {
  //html res
  res.send("<h1>Hello World</h1>");
});

app.get("/sayHello4", (req, res) => {
  //file html
  //res.sendFile(__dirname + "/views/numbers.html");
});

app.get("/sayHello5", (req, res) => {
  //ejs
  let numbers = "";
  for (let i = 0; i <= 100; i++) {
    numbers += i + " - ";
  }
  res.render(__dirname + "/views/numbers.ejs", {
    name: "sherif",
    numbers: numbers,
  });
});

// ============== ARTICLES ENDPOINTS =============

app.post("/articles", async (req, res) => {
  const newArticles = new Article();
  const artTitle = req.body.articleTitle;
  const artBody = req.body.articleBody;
  newArticles.title = artTitle;
  newArticles.body = artBody;
  newArticles.numberOfLikes = 0;
  await newArticles.save();
  res.json(newArticles);
});

app.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

app.get("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const articles2 = await Article.findById(id);
    res.json(articles2);
    return;
  } catch (error) {
    console.log("error while reading article of id", id);
    return res.json("error");
  }
});

app.delete("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const articles2 = await Article.findByIdAndDelete(id);
    res.json(articles2);
    return;
  } catch (error) {
    console.log("error while reading article of id", id);
    return res.json("error");
  }
});

app.get("/showArticles", async (req, res) => {
  const articles = await Article.find();
  try {
    res.render("articles.ejs", {
      allArticles: articles,
    });
  } catch (error) {
    console.log("error while reading article", id);
    return res.json("error");
  }
});

app.listen(3000, () => {
  console.log("i am listening in port 3000");
});

//npm init -y
//npm install express
//node index.js
//npx nodemon index.js
//npm install ejs
//npm install mongoose
