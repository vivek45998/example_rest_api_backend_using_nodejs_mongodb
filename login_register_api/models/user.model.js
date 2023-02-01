const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});
///mongo schema have few config option, pass to the constructor or to the set method 
/// the password,__v has which we have did not send back to the client
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});
///set here to unique validator for email which is not a duplicate.
userSchema.plugin(uniqueValidator, { message: "Email already in use.." });
//to retrive data from mongo query
const User = mongoose.model("user", userSchema);
module.exports = User;
