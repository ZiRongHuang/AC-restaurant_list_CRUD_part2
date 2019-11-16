const express = require("express");
const app = express();
const port = 3000;

// 設定 express handlebars & helper
const exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    helpers: {
      select: (selected, option) => {
        return selected == option ? 'selected="selected"' : "";
      }
    }
  })
);
app.set("view engine", "handlebars");

// 設定 body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// 設定 method override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// 設定 public 資料夾
app.use(express.static("public"));

// 設定 router
app.use("/", require("./routes/home.js"));
app.use("/restaurants", require("./routes/restaurant"));
app.use("/search", require("./routes/search"));

// 設定 資料庫連結
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/restaurant", { useNewUrlParser: true });
const db = mongoose.connection;

// db 偵聽
db.on("error", () => {
  console.log("app.js: mongodb error!");
});

db.once("open", () => {
  console.log("app.js: mongodb connected!");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
