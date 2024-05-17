require('dotenv').config();
const User = require("../../models/dashboard/login");
var jwt = require("jsonwebtoken");
const jwtkey = "admin_token";
const reset_key = "reset_token";
const { transporter } = require("../../middleware/nodemailer");
const bcrypt = require("bcryptjs");
const ejs = require("ejs");

 

/*** Login existing user ***/ 
async function postLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password is Required!",
      });
    }
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "User Not Found!"});
    } 
    let comp = await bcrypt.compare(req.body.password, user.password);
    if (!comp) {
      return res
        .status(401)
        .json({ message: "Invalid Email or Password" });
    }

    let token = jwt.sign({ user }, jwtkey); 
    res.status(200).json({ _id: user._id, email: user.email, token: token });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
}


/*** Reset Password***/ 
async function resetPassword(req, res) {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).json({message: 'user not found with this email'})
    return true;
  }
  jwt.sign({ user }, reset_key, { expiresIn: "5h" }, (err, token) => {
    ejs.renderFile('views/email/email.ejs', { link: process.env.RESET, token: token })
    .then(resp => {
      transporter.sendMail({
        from: "saadshabbir@leilanitech.com",
        to: req.body.email,
        subject: "Reset Password",
        html: resp
      })
        .then((response) => {
          console.log(token, user, response);
        });
      res.cookie("reset-token", token, { maxAge: 600000 }).send({ message: "Reset link sent to your email!" });
    });
  });
}


/*** New Password ***/ 
async function newPassword(req, res) {
  if(!req.body.password) {
    res.send({ message: "Password is Required!"});
    return true;
  }
  try {
    let email = req.body.email;
    let encrypted = await bcrypt.hash(req.body.password, 12);
    let update = User.findOneAndUpdate({ email: email }, {$set: { password: encrypted }})
    res.clearCookie("reset-token")
    res.json({ message: "Password Updated Successfully! " + update});
  } catch (err) {
    res.status(400).json({ message: err.message});
  }
}


/*** Export Functions ***/
module.exports = { postLogin, resetPassword, newPassword };

