const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let categorySchema = new mongoose.Schema({
  name: { 
    type: String,
    required: [true, "Category is required!"],
    unique: [true, "Category must be unique!"]
  }
});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
