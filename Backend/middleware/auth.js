const jwt = require('jsonwebtoken');
const SECRET_KEY = "RANDOM";
const user = "../models/userSchema.js";
const auth = (req,res,next) =>
{
    try {
        // console.log(req.headers)
        //token verificarion
        console.log(req.headers.authorization);
        let token = req.headers.authorization;
        // console.log(token);
        if(token)
        {
            token = token.split(" ")[1];
            console.log("token",token)
            let user = jwt.verify(token,SECRET_KEY);
            console.log("user",user);
            req.userId =user.id;
            console.log(req.userId);
        }
        else
        {
            res.status(400).send({status:false,message:"Unauthorized User"})
        }
        next();
        
    } catch (error) {
        console.log(error);
    }
}
module.exports = auth;