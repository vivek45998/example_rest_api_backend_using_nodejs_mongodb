const express = require("express");
const router = express.Router();
const Student = require("../model_schema_db/student_data");

router.get("/stdDataGet", function (req, res, next) {
  Student.find({})
    .then(function (student) {
      res.send(student);
    })
    .catch(next);
  // res.send({ type: "Get Request" });
});

router.post("/stdLogIn", function (req, res, next) {
  Student.findOne({
    $or: [
      {
        studentName: req.body.studentName,
      },
      {
        studentEmail: req.body.studentEmail,
      },
    ],
  })
    .then((user) => {
      if (user) {
        if (
          user.studentName === req.body.studentName ||
          (user.studentEmail === req.body.studentEmail &&
            user.studentPassword === req.body.studentPassword)
        ) {
          res.send(user);
        } else {
          res.send({ error: "Please enter valid email and password" });
        }
      }
    })
    .catch(next);
});

router.post("/stdDataAdd", function (req, res, next) {
  Student.findOne({
    $or: [
      {
        studentName: req.body.studentName,
      },
      {
        studentEmail: req.body.studentEmail,
      },
    ],
  }).then(async (user) => {
    if (user) {
      if (user) {
        let errors = {};
        if (user.studentName === req.body.studentName) {
          //  return {error:"user already exist"}
          errors.studentName = "User Name already exists";
        } else {
          errors.studentEmail = "Email already exists";
        }
        return res.status(400).json(errors);
      }
    } else {
      Student.create(req.body)
        .then(async function (student) {
          res.send(student);
          // const token = await Student.genrateAuthToken();
          // //console.log("token====$" + token);
          // const register = await Student.bulkSave();
          // res.send(token);
        })
        .catch(next);
    }
  });

  //  res.send({ type: "Post", name: req.body.name });
});
router.put("/stdDataUpdate/:id", function (req, res, next) {
  console.log(req.body.id);
  Student.findOneAndUpdate({ _id: req.params.id }, req.body).then(function (
    student
  ) {
    Student.findOne({ _id: req.params.id }).then(function (student) {
      res.send(student);
    });
  });
  //res.send({ type: "UpdateData" });
});
router.delete("/stdDataDelete/:id", function (req, res, next) {
  console.log(req.params.id);
  Student.findOneAndDelete({ _id: req.params.id }).then(function (student) {
    res.send(student);
  });
});
module.exports = router;
