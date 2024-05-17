var jwt = require('jsonwebtoken');
const jwtkey = "admin_token";
const reset_key = "reset_token";

//JWT Authentication Middleware
let verifyToken = (req, res, next) => {
   let token = req.headers["authorization"];
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token,jwtkey,(err,response) =>{
        if(err) {
            res.status(401).send({message: err });
        } else {
            next();
        }
    })
  } else {
    res.status(403).send({ message: "You are not authorized, please provide a valid token!!" });
  }
};

let resetToken = (req, res, next) => {
  let token = req.headers["authorization"];
    console.log(token);
    if (token) {
      token = token.split(" ")[1];
    jwt.verify(token,reset_key,(err,response) =>{
        if(err) {
            res.status(401).send({ message: err });
        } else {
            next();
        }
    })
  } else {
    res.status(403).send({ message: "Reset Token is required" });
  }
};

module.exports = { verifyToken, resetToken };