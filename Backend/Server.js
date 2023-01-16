const express = require("express");
const app = express();
const cors = require("cors");
const randomize = require("randomatic");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "RANDOM";
const { Schema } = mongoose;
const auth = require("./middleware/auth");
const nodemailer = require("nodemailer");
//Creating Connection To DB
mongoose.connect(
  "mongodb://Testdb:mudassir123@ac-fi1qm2h-shard-00-00.jgu2rjs.mongodb.net:27017,ac-fi1qm2h-shard-00-01.jgu2rjs.mongodb.net:27017,ac-fi1qm2h-shard-00-02.jgu2rjs.mongodb.net:27017/exercise?ssl=true&replicaSet=atlas-14hsb5-shard-0&authSource=admin&retryWrites=true&w=majority"
);
app.get("/", (req, res) => {
  console.log("Hit to the get route");
});
//Schema Here
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender:{type:String,default: 'Male'},
  email: { type: String, required: true },
  country:{type:String,default: 'Pak'},
  city:{type:String,default: 'Lahore'},
  dob:{type:String,default: '1-7-1999'},
  height:{type:String,default: '5Ft'},
  weight:{type:String,default: '50KG'},
  password: { type: String, required: true },
  token: { type: Number },
});
// creating model to use this schema
const User = mongoose.model("User", userSchema);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//
app.use(cors({ origin: "*" }));
//Post Api
app.post("/post", async (req, res) => {
  const user = req.body;
  const { firstName, lastName,gender, email,country,city,dob,height,weight, password } = req.body;
  console.log(req.body);

  const existingUser = await User.findOne({ email: email });
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .send({ status: false, message: "All Fields Required" });
  } else if (existingUser) {
    return res
      .status(200)
      .send({ status: false, message: "User Already Exists With Same Email" });
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        // console.log(hash);
        user.password = hash; //updating the password in user with hash password
        const authToken = jwt.sign(
          { email: User.email, id: User._id },
          SECRET_KEY
        );
        User.create(user);
        // console.log(authToken);
        return res
          .status(200)
          .send({
            status: true,
            message: "User added to the DataBase",
            user,
            authToken,
          });
      });
    });
  }
});
//login api
app.post("/login", async (req, res) => {
  // console.log("Login API Called");
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  const existingUser = await User.findOne({ email: email });
  // console.log("existingUser", existingUser);
  const matchPassword = await bcrypt.compare(password, existingUser.password);
  try {
    if (!email || !password) {
      res
        .status(404)
        .send({ status: false, message: "Email And Password Are Required" });
    }
    if (existingUser && matchPassword) {
      const authToken = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        SECRET_KEY,
        { expiresIn: "1d" }
      );
      // localStorage.setItem("token" ,authToken);
      res.status(200).send({
        status: true,
        message: "User Found Redirect to Profile Page",
        data: {
          email,
          password,
          authToken,
        },
      });
    }

    if (!existingUser || !matchPassword) {
      res
        .status(200)
        .send({
          status: false,
          message: "User Not Found With this email & password",
        });
    }
  } catch (error) {
    console.log(error);
  }
});

//Forget Password api with nodemailer
app.post("/forget", async (req, res) => {
  const { email } = req.body;
  //Find the user with the matching email
  const user = await User.findOne({ email: email });
  if (user) {
    // token genrate
    const token = randomize("0", 10);
    await User.findOneAndUpdate({ email: email }, { token });
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'torrance.cassin@ethereal.email',
        pass: '4YR8PMt4K4fPhd6UQr'
    },
    });
      // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Forget Password", // Subject line
    text: token, // plain text body
    html: token, // html body
  });
  console.log("Message sent: %s", info.messageId);
    res.status(200).send({ status: true, message: "User Found And Token added" });
    // console.log("Token Added");
  } else {
    res.status(404).send({ status: false, message: "User Not Found" });
  }
});
//Profie Api
app.get("/profile", auth, async (req, res) => {
  let token = await req.headers.authorization;
  try {
    token = token.split(" ")[1];
    // console.log("Token", token);
    var decoded = jwt.decode(token, SECRET_KEY);
    // console.log("decoded", decoded);
    // console.log("decodedID", decoded.id);
    const userID = decoded.id;
    // console.log("User ID", userID);
    const user = await User.findOne({ _id: userID });
    if (!user) return res.status(404).send({ status: false, message: "User not found" });
    res.status(200).send({ status: true, user });

  } catch (error) {
    console.log(error);
  }
  // console.log("Profile Api is called");
  res.status(200).send({ status: true, message: "Api Called" });
});
//API to Create Activity 
//Schema Here
const taskSchema = new Schema({
  date: { type: String, required: true },
  type: { type: String, require: true },
  duration: { type: String, require: true },
  comment: { type: String, require: true },
});
// creating model to use this schema
const Task = mongoose.model("Task", taskSchema);
app.post ('/createActivity', async(req,res)=>
{
  console.log(userID);
  const task = req.body;
  const {date, type,duration,comment} = req.body;
  await Task.create(task);
  let token = await req.headers.authorization;
  try {
    token = token.split(" ")[1];
    console.log("Token", token);
    var decoded = jwt.decode(token, SECRET_KEY);
    console.log("decoded", decoded);
    console.log("decodedID", decoded.id);
    const userID = decoded.id;
    console.log("User ID", userID);
    res.status(200).send({ status: true, message:"Activity Added" });
  } catch (error) {
    console.log(error);
  }
})
//update api
// app.put('/update/:id', (req, res) => {
//   // Find the user by ID in the MongoDB database
//   User.findById(req.params.id, (err, user) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     // Update the user details
//     user.firstName = req.body.firstName;
//     user.lastName = req.body.lastName;
//     user.gender = req.body.gender;
//     user.email = req.body.email;
//     user.country = req.body.country;
//     user.city = req.body.city;
//     user.DOB = req.body.DOB;
//     user.height = req.body.height;
//     user.weight = req.body.weight;
//     // Save the updated user details in the MongoDB database
//     user.save((err, updatedUser) => {
//       if (err) {
//         return res.status(500).send(err);
//       }
//       res.send(updatedUser);
//     });
//   });
// });
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
