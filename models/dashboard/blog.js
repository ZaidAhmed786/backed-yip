const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let blogSchema = new mongoose.Schema({
  title: {
     type: String,
     required: [true, "Blog Must have a Title"],
     unique: true 
  },
  content: { 
    type: [],
    required: [true, "Blog must have Content"],
  },
  excerpt:{
     type:String,
     required: [true, "Blog must have Excerpt"],
    },
  image: {
     type: String,
     required: [true, "Blog must have Image"],
  },
  image_id: {
     type: String,
     required: [true, "Blog must have Image_ID"] 
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  status: { type: Boolean, default: false },
  read_time: {
    type: String,
    required: [true, "Blog must have a read_time"]
  },
  meta_keywords:{
    type:[],
    required: [true, "Please specify meta keywords for this Blog"]
  },
  alt_img:{ 
    type:[],
    required: [true, "Please specify alt_img for this Blog"], 
  },
  slug:{ 
    type:String,
    required: [true, "Please specify slug for this Blog"] 
  },
  
  user: { type: Schema.Types.ObjectId, ref: "User" },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;

