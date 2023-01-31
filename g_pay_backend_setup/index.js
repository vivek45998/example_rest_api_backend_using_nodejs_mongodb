const express = require("express");
const app = express();
//app.get("/api", (req, res) => res.send("Api is Working now !!"));
app.use(express.json());
app.use(express.urlencoded());
app.use("/api", require("./route/apiV2"));

app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});

app.listen(process.env.port || 3001, function () {
  console.log("server strted now");
});
