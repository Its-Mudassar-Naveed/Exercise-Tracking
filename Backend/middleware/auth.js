const jwt = require('jsonwebtoken');
const SECRET_KEY = "RANDOM";
const auth = (req,res,next) =>
{
    try {
        console.log(req.headers)
        //token verificarion
        let token = req.headers.authorization;
        if(token)
        {
            token = token.split(" ")[1];
            let user = jwt.verify(token,SECRET_KEY);
            req.userId =user.id;
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