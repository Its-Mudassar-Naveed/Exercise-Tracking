const express = require("express");
const app = express();
const cors = require("cors");
const randomize = require("randomatic");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const SECRET_KEY = "RANDOM";
const { Schema } = mongoose;
const auth = require("./middleware/auth");

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
  token: { type: Number },
});
// creating model to use this schema
const User = mongoose.model("User", userSchema);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
//Post Api 
app.post("/post", async (req, res) => {
  // console.log('api hit');
  console.log(req.body);
  const user = req.body;
  const { firstName, lastName, email, password } = req.body;
  const existingUser = await User.findOne({email:email});
  console.log(req.body);
   if (!firstName || !lastName || !email || !password) {
    return res.status(400).send({ status: false, message: "All Fields Required" });
  }
  else if(existingUser)
  {
   return res.status(200).send({ status: false, message: "User Already Exists With Same Email"});
  }
 else {
      let authToken;
      bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        // console.log(hash);
        user.password = hash; //updating the password in user with hash password
        authToken = jwt.sign({email : User.email, id: User._id},SECRET_KEY); 
        User.create(user);
        console.log(authToken.id);
        return res.status(200).send({ status: true, message: "User added to the DataBase",authToken });

      });
    });
  }
});

//login api
app.post("/login" ,auth, async (req,res)=>
{
  // console.log(req.userId);
  const { email, password } = req.body;
  const existingUser =  await User.findOne({email : email });
  const matchPassword = await bcrypt.compare(password, existingUser.password)
  try {
    if(!email || !password)
    {
      res.status(404).send({status:false,message:"Email And Password Are Required"})
    }
    if(existingUser && matchPassword)
    {
      res.status(200).send({status:true,message:"User Found"})
    }
    if(!existingUser || !matchPassword)
    {
      res.status(200).send({status:false,message:"User Not Found With this email & password"})
    }
    
  } catch (error) {
    console.log(error)
    
  }

})


//Forget api
app.post("/forget", async (req, res) => {
  const { email } = req.body;
  //Find the user with the matching email
  const user = await User.findOne({ email: email });
  if (user) {
    // token genrate
    const token = randomize("0", 10);
    // console.log(token);
    await User.findOneAndUpdate({ email: email }, { token });
    res
      .status(200)
      .send({ status: true, message: " User Found And Token added" });
    console.log("Token Added");
  } else {
    res.status(404).send({ status: false, message: " User Not Found" });
  }
});
//Get Api Getting with specific id
app.get("/:id", (req, res) => {
  console.log(req.body);
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(404).json({ success: false }));
});
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
