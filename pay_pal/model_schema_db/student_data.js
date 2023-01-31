const mongoose = require("mongoose");
const jwtToken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
  studentName: { type: String },
  studentAge: { type: String },
  studentEmail: { type: String },
  studentPassword: { type: String },
});

StudentSchema.methods.generateAuthToken = async function () {
  try {
    console.log(this._id);
    const token = await jwtToken.sign(
      { _id: this._id.toStrings() },
      "mynameisvivekkumaryadavgirjashankaryadav"
      // { expiresIn: "2 seconds" }
    );
    this.tokens = this.tokens.concat({ token });
    await this.save();
    console.log(token);
    return token;
  } catch (error) {
    res.send("the error part" + error);
    console.log("theerror" + error);
  }
};

const Student = mongoose.model("student", StudentSchema);
module.exports = Student;

// tokens: [
//     {
//       token: { type: String, required: true },
//     },
//   ],
