const express = require("express");
const app = express();
var cors = require('cors')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
// mongoose.connect("mongodb+srv://Testdb:mudassir123@cluster0.jgu2rjs.mongodb.net/eercise?retryWrites=true&w=majority")
mongoose.connect(
  "mongodb://Testdb:mudassir123@ac-fi1qm2h-shard-00-00.jgu2rjs.mongodb.net:27017,ac-fi1qm2h-shard-00-01.jgu2rjs.mongodb.net:27017,ac-fi1qm2h-shard-00-02.jgu2rjs.mongodb.net:27017/exercise?ssl=true&replicaSet=atlas-14hsb5-shard-0&authSource=admin&retryWrites=true&w=majority"
);

app.get("/", (req, res) => {
  console.log("Hit to the get route");
});
//Schema Here
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, require: true },
  Email: { type: String, require: true },
  Password: { type: String, require: true },
});
// creating model to use this schema
const User = mongoose.model("User", userSchema);
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/*',cors());
app.post("/post", (req, res) => {
    console.log('api hit');
  // console.log(req.body)
  const user = req.body;
  const { firstName, lastName, Email, Password } = req.body;
  if (!firstName || !lastName || !Email || !Password) {
    res.status(404).send("All Fields Are required");
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.Password, salt, function (err, hash) {
        console.log(hash);
        user.Password = hash; //updating the password in user with hash password
        User.create(user);
        console.log(user);
        res.status(200).send(`User added to the db with following details`);
      });
    });
  }


});

//connecting to DB
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
