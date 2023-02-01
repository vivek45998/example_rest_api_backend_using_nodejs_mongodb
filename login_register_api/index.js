const express = require("express");
const mongoose = require("mongoose");
var { unless } = require("express-unless");
const dbConfig = require("./config/db.config");
const middle = require("./middlewares/auth");
const errors = require("./middlewares/errors");

const app = express();
//if we want to use mongoose in diffrent position it must be seen as global mode
//that's why set mongoose like this
mongoose.Promise = global.Promise;


mongoose
  .connect(dbConfig.db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log("data base connected");
    },
    (error) => {
      console.log("database can't be connected:" + error);
    }
);
  
//1)this authentcateToken is write inside of the auth file
//with the help of unless it will just check the condition 
//if user having a token or not the basis of user will redircet unautorized page

middle.authenticateToken.unless = unless;
//2)unless check the token when page have a token then it will go on authorized page other
//wise go on unauthorizesd page.
//after login when we genrate a token that token user for a other api.
app.use(
  middle.authenticateToken.unless({
    path: [
      { url: "/users/login", methods: ["POST"] },
      { url: "/users/register", methods: ["POST"] },
    ],
  })
);

// it is method inbuilt in express ,to recognise incoming request as json object this method
//is called a middlle ware in our appliction using the code
app.use(express.json());

// here we initilize our route
app.use("/users", require("./routes/users.routes"));

app.use(errors.errorHanler);

app.listen(process.env.port || 3001, function () {
  console.log("server started");
});
