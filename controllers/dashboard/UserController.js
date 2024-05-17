const User = require("../../models/dashboard/login");
const bcrypt = require("bcryptjs");
const {uploadFile, deleteImage} = require("../../middleware/s3");

/*** Create User by Admin ***/ 
const add_user = async (req, res) => {  
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      let hashedPass = await bcrypt.hash(req.body.password, 12);
       if(hashedPass) {
        let result = await User.create({email:req.body.email, password: hashedPass});
        if(result) {
          console.log(result);
          res.send(result);
        }
      } 
    } else {
      res.send({message:"user already registered!!"})
    }
  } 

/*** Get all Users from Database ***/ 
const get_users = async (req, res) => {
    const record = await User.find({});
    if ( record ) {
      res.status(200).send(record);
    }
};

 /*** edit an existing category ***/
 const edit_user = async(req, res) => {
  const id = req.params.id; 
  console.log("user unique id", id);
  const user = await User.findById(id);
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(400).send({Message:"User not Found!"});
  }
};

/*** update user through edit users ***/
const update_user = async (req, res) => {
  const id = req.params.id;
   try {
    let data = await User.findById(id);
    let result;
    if (req.file) {
      result = await uploadFile(req.file);
      await deleteImage(data.image_id, (res) => {
        console.log("res", res);
      });
    }
    let record = {
      name: req.body.name?req.body.name:data.name,
      email: req.body.email?req.body.email:data.email,
      image: result?result.Location : data.image,
      image_id: result?result.Key : data.image_id
    };
    const user = User.findByIdAndUpdate(id, { $set: record });
    user.then((resp) => {
      let result = User.findById(resp._id);
      result.then((response) => {
        if (response) {
           res.status(200).send(response);
        }
      });
    });
  } catch (err) {
    console.log(err);
    res.status(409).send({ message: err });
  }
};


/*** Remove a User ***/
async function remove_user(req, res) {
  const id = req.params.id;
  let record = await User.findById(id);
  if (record) {
    await deleteImage(record.image_id);
    const user = User.findByIdAndDelete(id);
    user.then((resp) => {
      console.log(resp);
      res.send({ message: "User Removed Successfully!" });
    });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
}


/*** Export all functions ***/ 
module.exports = {get_users, add_user, edit_user, update_user, remove_user};