// main2.js
"use strict";

const port = 3000,
  express = require("express"),
  layouts = require("express-ejs-layouts"),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  Subscriber = require("./models/subscriber"),
  app = express();

/**
 * @TODO: Listing 14.1 (p. 205)
 * Mongoose를 사용한 MongoDB 연결
 */
const mongoose = require("mongoose"),
  dbURL = "mongodb+srv://zzkzz0001:NWxGByg9F8AgAuJp@ut-node.dt0wsb9.mongodb.net/?retryWrites=true&w=majority&appName=ut-node", // atkas
  dbName = "ut-node";

mongoose.connect(
  dbURL + "/" + dbName, // URL + dbName
  { useNewUrlParser: true }
);

const db = mongoose.connection;
/**
 * @TODO: Listing 14.2 (p. 206)
 * 데이터베이스 연결 이벤트 처리
 */
db.once("open", () =>{
  console.log("DB connercted!!!")
});

/**
 * Listing 14.4 (p. 207)
 * 생성과 저장 구문
 */
// verson 1
let sub1 = new Subscriber({
  name: "aaron",
  email: "aaronkr.trainer@gmail.com",
  phone: 123456789,
  newsletter: true
});

sub1.save()
  .then(savedDoc => {
    console.log(savedDoc);
  })
  .catch(error => {
    console.log(error);
  });

// verson 2
Subscriber.create({
  name: "Tom Hiddleston",
  email: "loki@mv.com",
  phone: 66666,
  newsletter: false
})
.then(savedDoc => {
  console.log(savedDoc);
})
.catch(error => {
  console.log(error);
});

// (선택) DB find() after 14.5
let tom = Subscriber
            .findOne({name: "Tom Hiddleston"})
            .where(
              "email",
              /loki/
            );
console.log("Found: ", tom);

/**
 * @TODO: Listing 14.6 (p. 208)
 * 데이터베이스에서 데이터 검색
 */

var query = Subscriber.findOne({
  name: "aaron",
}).where("email", /aaron/);

query.exec()
    .then((error, data) => {
      if (data) console.log(data.name);
    });

app.set("port", process.env.PORT || port);
app.set("view engine", "ejs");

app.use(layouts);
app.use(express.static("public"));

app.get("/", homeController.getHomePage);
app.get("/name/:myName", homeController.respondWithName2);

/**
 * Listing 11.4 (p. 169)
 * 사용자 정의 메시지를 통한 에러와 없는 라우트 처리
 */
app.use(errorController.logErrors);
app.use(errorController.resNotFound); // main.js에 에러 처리 미들웨어 추가
app.use(errorController.resInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
