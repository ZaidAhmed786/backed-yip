const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let blogsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog Title is Required!"],
  },
  status: {
    type: Boolean,
    default: false 
  },
  content: {
    type: String,
    required: [true, "Blog must have Content"]
  },
  excerpt: {
    type: String,
    required: [true, "Blog Excerpt is Required!"]
  },
  read_time: {
    type: String,
    required: [true, "Blog must have a read_time"]
  },
  meta_keywords: {
    type: [],
    required: [true, "Please specify meta keywords for this Blog"]
  },
  alt_img: {
    type: [],
    required: [true, "Please specify alt_img for this Blog"],
  },
  slug: {
    type: String,
    required: [true, "Please specify slug for this Blog"]
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    required: false
  },
  blog_image: {
    type: String,
    required: [true, "Blog Image is Required"]
  },
  image_id: {
    type: String,
  },
  tags: [{ type: Schema.Types.ObjectId, ref: "SolitaryTag" }],
  user: { type: Schema.Types.ObjectId, ref: "User" },
  category: { type: Schema.Types.ObjectId, ref: "SolitaryCategory" },
});
const Blogs = mongoose.model("SolitaryBlog", blogsSchema);
module.exports = Blogs;
