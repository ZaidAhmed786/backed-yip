const mongoose = require("mongoose");
const tagSchema = new mongoose.Schema({ 
  name:{
    type: String,
    required: [true, "Tag must have a Name!"],
    unique: true,
    trim: true
  },  
}, {
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});
tagSchema.virtual('blogs', {
 ref: 'SolitaryBlog',
 localField: '_id',
 foreignField: 'tags'
});
const Tag = mongoose.model("SolitaryTag", tagSchema);
module.exports = Tag;