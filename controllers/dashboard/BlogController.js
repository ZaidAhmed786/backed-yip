const { mongoose } = require("mongoose");
const Blog = require("../../models/dashboard/blog");
// const { uploadFile, deleteImage } = require("../../middleware/s3");
const cloudinary = require("../../utils/cloudinary");

const add_blog = async (req, res) => {
  if (!req.file) {
    res.status(404).json({ message: "Blog Image is Required!!" });
    return true;
  }
  try {
    const {
      title,
      content,
      read_time,
      tags,
      excerpt,
      status,
      alt_img,
      meta_keywords,
      slug,
    } = req.body;
    // const result = await uploadFile(req.file);
    let image_upload = await cloudinary.uploader.upload(req.file.path);
    const parsedTags = tags ? JSON.parse(tags) : [];
    let record = {
      title,
      meta_keywords,
      alt_img,
      slug: slug && slug.toLowerCase(),
      // image: result && result.Location,
      // image_id: result && req.file.originalname,
      image_id: image_upload && image_upload.public_id,
      image: image_upload && image_upload.secure_url,
      content,
      excerpt,
      status: req.body.status ? JSON.parse(status) : false,
      read_time,
      user: mongoose.Types.ObjectId(req.body.user),
      category: mongoose.Types.ObjectId(req.body.category),
      tags: parsedTags.map((tag) => mongoose.Types.ObjectId(tag)),
    };
    const data = await Blog.create(record);
    res.send(data);
  } catch (err) {
    err.name === "MongoServerError" && err.code === 11000
      ? res.status(400).send({ message: "Blog already exists" })
      : res.status(400).send({ message: err.message });
  }
};

// get all Blogs
async function get_blogs(req, res) {
  let start = req.query.start;
  let end = req.query.end;
  const total = await Blog.countDocuments();
  const { limit, category, search, skip, tag, status, slug, title } = req.query;
  if ((req.query.page && !limit) || (skip && !limit)) {
    return res.status(401).send({
      message: "Limit is compulsory!",
    });
  }
  if (start && !end) {
    return res.status(401).send({
      message: "Enter End Date!",
    });
  }
  const page = req.query.page * 1 || 1;
  const limitQuery = req.query.limit * 1 || total;
  const skipQuery = (page - 1) * limit;

  let searchQuery = {};
  // Apply Search query on differen use case
  if (search) {
    searchQuery = { $or: [{ title: { $regex: search } }] };
  }
  if (tag) {
    searchQuery = { ...searchQuery, tags: { $in: [tag] } };
  }
  if (slug) {
    searchQuery = { ...searchQuery, slug };
  }
  if (title) {
    searchQuery = { ...searchQuery, title };
  }
  if (category) {
    searchQuery = { ...searchQuery, category };
  }
  if (start && end) {
    searchQuery = { ...searchQuery, created_at: { $gte: start, $lte: end } };
  }
  if (status) {
    searchQuery = { ...searchQuery, status };
  }
  // Applying Query for fetch data
  const Query = Blog.find(searchQuery)
    .sort({ created_at: -1 })
    .skip(skipQuery)
    .limit(limitQuery)
    .populate({
      path: "user",
      model: "User",
      select: "-password",
    })
    .populate({
      path: "category",
      model: "Category",
      select: "name",
    })
    .populate({
      path: "tags",
      model: "Tag",
      select: "name",
    });

  // final query
  try {
    const blogs = await Query;
    res.status(200).json({ total, blogs });
  } catch (err) {
    res.status(400).send(err.message);
  }
}

//  get a single existing Blogs
async function single_blog(req, res) {
  const _id = req.params.id;
  try {
    const blog = await Blog.find({ _id })
      .populate("user", "-password")
      .populate("category", "name")
      .populate("tags", "name");
    res.send(blog);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err });
  }
}

//update Blog
async function update_blog(req, res) {
  const id = req.params.id;
  const {
    title,
    content,
    read_time,
    status,
    slug,
    tags,
    meta_keywords,
    excerpt,
    alt_img,
  } = req.body;
  const parsedTags = tags ? JSON.parse(tags) : [];
  let data = await Blog.findById(id);
  if (!data) {
    res.status(404).send({ message: "Blog Not Found" });
  }
  // let result;
  // if (req.file) {
  //   console.log(req.file.path);
  //   // result = await uploadFile(req.file);
  //   // await deleteImage(data.image_id, (res) => {
  //   //   console.log("res", res);
  //   // });
  // }

  let image_upload;
  if (req.file) {
    await cloudinary.uploader.destroy(data.image_id);
    image_upload = await cloudinary.uploader.upload(req.file.path);
  }

  let record = {
    title: title,
    // image: result ? result.Location : data.image,
    // image_id: result ? req.file.originalname : data.image_id,
    content: content,
    image: image_upload && image_upload.secure_url,
    image_id: image_upload && image_upload.public_id,
    read_time: read_time,
    slug: slug && slug.toLowerCase(),
    meta_keywords: meta_keywords,
    alt_img: alt_img,
    updated_at: Date.now(),
    status: status && JSON.parse(status),
    excerpt: excerpt,
    category: req.body.category
      ? mongoose.Types.ObjectId(req.body.category)
      : data.category,
    tags: req.body.tags
      ? parsedTags.map((tag) => mongoose.Types.ObjectId(tag))
      : data.tags,
  };
  const blog = await Blog.findByIdAndUpdate(req.params.id, record, {
    new: true,
  })
    .populate({ path: "user", model: "User" })
    .populate({ path: "category", model: "Category", select: "name" })
    .populate({ path: "tags", model: "Tag", select: "name" });
  if (blog) {
    res.status(200).send(blog);
  } else {
    res.status(500).send({ message: "Blog Updation Failed!!" + err.message });
  }
}

//Remove a Blog
async function remove_blog(req, res) {
  try {
    const id = req.params.id;
    let blog = await Blog.findById(id);
    if (blog) {
      const record = Blog.findByIdAndDelete(id);
      record.then(async (resp) => {
        // await deleteImage(blog.image_id);
        await cloudinary.uploader.destroy(blog.image_id);
        res.status(200).send({ message: "Blog Deleted Successfully!" });
      });
    } else {
      res.status(404).send({ message: "Blog Not Found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}
//

module.exports = { add_blog, get_blogs, single_blog, update_blog, remove_blog };
