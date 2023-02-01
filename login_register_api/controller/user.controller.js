const bcrypt = require("bcryptjs");
const userService = require("../services/users.services");
exports.register = (req, res, next) => {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  //when the user register first thing we utilize bcryptjs to encrypt the password
  //salt create the unique password even the instant of two user selct same password
  //here just hashing the our password
  req.body.password = bcrypt.hashSync(password, salt);
  userService.register(req.body, (error, result) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: result,
    });
  });
};

exports.login = (req, res, next) => {
  const { username, password } = req.body;
  userService.login({ username, password }, (error, result) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({ message: "Success", data: result });
  });
};
/// after user login genrate  a token when we access this api
///the token is verified then genrate response Authorised user
exports.userProfile = (req, res, next) => {
  return res.status(200).json({ message: "Authorized User!" });
};
