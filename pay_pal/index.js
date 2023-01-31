const express = require("express");
const env = require("dotenv");
const cookieParser = require("cookie-parser");
//const cookieSession = require("cookie-session");
const jwtToken = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
var corsOptions = {
  origin: "http://localhost:8081",
};
const app = express();
app.use(cookieParser());
app.use(cors(corsOptions));
// app.use(
//   cookieSession({
//     name: "test-app-session",
//     secret: "app aa", // should use as secret environment variable
//     httpOnly: true,
//     keys: ["key1", "key2"],
//   })
// );
///////check token start....
// const createToken = async () => {
//   const token = await jwtToken.sign(
//     {
//       _id: "63d2e16f4b887f2b75ec2ec7",
//     },
//     "mynameisvivekkumaryadavgirjashankaryadav",
//     {
//       expiresIn: "2 seconds",
//     }
//   );
//   console.log(token);
//   const userVer = await jwtToken.verify(
//     token,
//     "mynameisvivekkumaryadavgirjashankaryadav"
//   );
//   console.log(userVer);
// };
// createToken();

/////token end
env.config({ path: "./config.env" });
mongoose.connect("mongodb://127.0.0.1:27017/ourDb");
mongoose.Promise = global.Promise;
const PORT = process.env.PORT;
//app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
app.use(express.json());
app.use(express.urlencoded());
app.get("/", (req, res) => {
  // req.cookieSession.connect = true;
  console.log(req.cookieSession);
  // console.log(req.cookieSession.env);
  res.send("Hello session is created");
});
app.use("/api", require("./route/backend_basic_work_with_mongo_db"));
app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});

app.listen(PORT, () => {
  console.log("server running" + PORT);
});
