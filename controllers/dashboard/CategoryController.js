const Category = require("../../models/dashboard/categories");


/*** Add Category ***/
async function add_category(req, res) {
  try {
    const record = await Category.create({ name: req.body.category });
    res.send(record);
  } catch (err) {
    err.name ==="MongoServerError" && err.code === 11000 
      ? res.status(400).send({message:"Category already exists"})
      : res.status(400).send({message:err.message}); 
  }
}


/*** Get all Categories from Database ***/ 
async function get_category(req, res) {
  const record = await Category.find({});
  res.status(200).send(record);
}


/*** Get Single Category ***/
async function edit_category(req, res) {
  Category.findById(req.params.id).then((category) =>{res.status(200).send(category)})
  .catch((err) =>{res.status(500).json({message:"Category not Found " + err.message})});
}


/*** Update Category ***/
const update_category = async(req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.category }, {
      new: true,
      runValidators: true
    });
      res.send(category);
  } catch (err) {
      res.send(err.message);
  }
}


/*** Remove a Category ***/
async function remove_category(req, res) {
  try {
    await Category.findByIdAndDelete(req.params.id)
    res.status(200).send({ message: "Category Deleted Successfully!" });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}


/*** Export all Functions ***/
module.exports = { get_category, add_category, edit_category, update_category, remove_category };
