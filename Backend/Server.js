const express = require("express");
const app = express();
var cors = require('cors')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
// mongoose.connect("mongodb+srv://Testdb:mudassir123@cluster0.jgu2rjs.mongodb.net/eercise?retryWrites=true&w=majority")
//connecting to DB
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
  email: { type: String, require: true },
  password: { type: String, require: true },
});
// creating model to use this schema
const User = mongoose.model("User", userSchema);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({origin:'*'}))
app.post("/post", (req, res) => {
    // console.log('api hit');
   console.log(req.body)
  const user = req.body;
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body);
  if(!firstName || !lastName || !email || !password) {
    return res.status(400).send({status:false, message:"All Fields Required"})
  } 
  else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        console.log(hash);
        user.password = hash; //updating the password in user with hash password
        User.create(user);
        console.log(user);
        // res.status(200).send(`User added to the db with following details`);
        return res.status(200).send({status:true, message:"User added to the DataBase"})
      });
    });
  }
});
//Login Api
app.post('/login', (req,res)=>
{
  console.log(req.body);
  const {loginEmail,loginPassword} = req.body;
  if(!loginEmail || !loginPassword)
  {
    res.status(400).send({status:false,message:"Login Email And Password Required"})
  }else
  {
    res.status(200).send({status:true,message:"User Found"})
  }

})

app.post('/forget',(req,res)=>
{
  const {email} = req.body;
  if(!email)
  {
    res.status(400).send({status:false,message:"Email is required"});
  }else
  {
    res.status(200).send({status:true,message:"Email found"});
  }
  console.log(email);
})




const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
