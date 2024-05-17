const mongoose = require('mongoose');
let mongoSchema = new mongoose.Schema({
    email:{ 
        type:String,
         required: [true, "Email is Required!"], 
         validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
            },
            message: "Please enter a valid email address"
        } 
    },
    password:{
        type:String,
        min: [8, "Password must be at least 8 characters"],
        max: [20, "Password must be at most 20 characters"]
    },
    image:{ type:String, required:false },
    name:{ required:false, type:String },
    image_id:{ type:String },
    role:{
        required:false,
        type:String,
        default:'user',
        enum : ['admin', 'user', 'team-lead']
    }
});
const User = mongoose.model("User", mongoSchema);
module.exports = User;