const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let categorySchema = new mongoose.Schema({
  name: { 
    type: String,
    required: [true, "Category is required!"],
    unique: [true, "Category must be unique!"]
  },
  createdAt:{
    type: Date,
    default: Date.now(),
    select: false
  }
});
const Category = mongoose.model("SolitaryCategory", categorySchema);
module.exports = Category;
