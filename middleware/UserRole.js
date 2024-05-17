const User = require('../models/dashboard/login');
let roleManage = async (req, res, next) => {
  let user = await User.find({_id:req.body.user})
  if(user) {
    console.log(req.body);
    if(user.role !== 'admin') {
      res.status(401).send({message:"You are not allowed to get this route!"});
    } else {
      next();
    } 
  }
}
module.exports = {roleManage};