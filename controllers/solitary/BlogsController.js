const SolitaryBlog = require('../../models/solitary/Blogs');
const cloudinary = require("../../utils/cloudinary");
const mongoose = require("mongoose");
module.exports = {

  /*** Add Blog Message to Database ***/
  add_blogs: async (req, res) => {
    try {
      const { title, content, read_time, tags, excerpt, status, alt_img, meta_keywords, slug } = req.body;
      const parsedTags = tags ? JSON.parse(tags) : [];
      if (!req.file) {
        res.status(404).json({ message: "Blog Image is Required!!" });
        return true;
      }
      let image_upload = await cloudinary.uploader.upload(req.file.path);
      console.log(image_upload);
      console.log(req.body);
      const data = {
        title,
        content,
        excerpt,
        read_time,
        meta_keywords,
        slug: slug && slug.toLowerCase(),
        user: mongoose.Types.ObjectId(req.body.user),
        image_id: image_upload && image_upload.public_id,
        blog_image: image_upload && image_upload.secure_url,
        category: mongoose.Types.ObjectId(req.body.category),
        status: req.body.status ? JSON.parse(status) : false,
        tags: parsedTags.map((tag) => mongoose.Types.ObjectId(tag)),
        alt_img, status: req.body.status ? JSON.parse(status) : false,
      }
      const blog = await SolitaryBlog.create(data);
      res.status(200).json({
        status: 'success',
        data: {
          blog
        }
      });
    }
    catch (err) {
      err.name === "MongoServerError" && err.code === 11000
        ? res.status(400).send({ message: "Blog already exists" })
        : res.status(400).send({ message: err.message });
    }
  },

  /*** Get Blogs from Database ***/
  get_blog: async (req, res) => {
    try {

      // Filteration
      let queryObj = { ...req.query };
      let excludedFields = ['page', 'limit', 'sort', 'fields'];
      excludedFields.forEach(field => delete queryObj[field]);

      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match =>`$${match}`);

      let query = SolitaryBlog.find(JSON.parse(queryStr))
      .populate({
        path: "user",
        model: "User",
        select: "-password",
      })
      .populate({
        path: "category",
        model: "Category",
      })
      .populate({
        path: "tags",
        model: "Tag",
        select: "name",
      });

      // Sorting
      if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
      } else {
        query = query.sort('-createdAt');
      }

      //Fields Limiting

      if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
      } else {
        query = query.select('-__v');
      }

      //Pagination
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 10;
      const skip = (page - 1) * limit;

      query = query.skip(skip).limit(limit);

      if (req.query.page) {
        const data = await SolitaryBlog.countDocuments();
        if (skip >= data) throw new Error("This page does not exist");
      }
      // Execute the Query
      const blogs = await query;

      res.status(200).json({
        status: 'success',
        results: blogs.length,
        data: {
          blogs
        }
      });
    } catch (err) {
      res.status(401).json({ status: 'fail', message: err.message });
    }
  },

  /*** edit an existing blog message ***/
  edit_blog: async (req, res) => {
    try {
      const blog = await Blogs.findById(req.params.id)
      .populate({
        path: "user",
        model: "User",
        select: "-password",
      })
      .populate({
        path: "category",
        model: "Category",
      })
      .populate({
        path: "tags",
        model: "Tag",
        select: "name",
      });
      res.status(200).json({
        status: 'success',
        data: {
          blog
        }
      })
    } catch (err) {
      res.status(401).json({ status: 'fail', message: err.message })
    }

  },

  /*** Update blog ***/
  update_blogs: async (req, res) => {
    try {
      const { title, content, read_time, tags, excerpt, status, alt_img, meta_keywords, slug } = req.body;
      const id = req.params.id; 
      const parsedTags = req.body.tags ? JSON.parse(req.body.tags) : [];
      let image_upload;
      if (req.file) {
        let record = await SolitaryBlog.findById(id);
        console.log(record);
        await cloudinary.uploader.destroy(record.image_id);
        image_upload = await cloudinary.uploader.upload(req.file.path);
      }
      console.log(image_upload);
      const data = {
        title,
        content,
        read_time,
        excerpt,
        status,
        alt_img,
        meta_keywords,
        slug,
        blog_image: image_upload && image_upload.secure_url,
        image_id: image_upload && image_upload.public_id,
        category: req.body.category && mongoose.Types.ObjectId(req.body.category),
        tags: req.body.tags && parsedTags.map((tag) => mongoose.Types.ObjectId(tag)),
        updatedAt: Date.now(),
      }
      const blog = await SolitaryBlog.findByIdAndUpdate(req.params.id, data, {
        new: true,
        runValidators: true
      });
      res.status(200).json({
        status: 'success',
        data: {
          blog
        }
      });
    } catch (err) {
      res.status(401).json({ status: 'fail', message: err.message });
    }
  },

  /*** Remove a Message ***/
  remove_blogs: async (req, res) => {
    try {
      let result = await SolitaryBlog.findById(req.params.id);
      if( !result ) {
        return res.status(404).send({ status: 'fail', message:"Couldn't find Blog"});
      }
      await Blogs.findByIdAndDelete(req.params.id);
      await cloudinary.uploader.destroy(result.image_id);
      res.status(204).json({ status: 'success', data: null });
    } catch (err) {
      res.status(404).json({ status: 'fail', message: err.message })
    }
  },
};

