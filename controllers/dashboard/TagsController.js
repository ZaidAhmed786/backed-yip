const Tag = require("../../models/dashboard/tags");


/*** Create New Tag ***/
const add_tag = async (req, res) => {
  try {
    const record = await Tag.create({ name: req.body.name });
    res.send(record);
  } catch (err) {
    err.name ==="MongoServerError" && err.code === 11000 
      ? res.status(400).send({message:"Tag Name Already Exists!!"})
      : res.status(400).send({message:err.message});
  }
 }


/*** Get All Tags from Database ***/ 
function get_tag(req, res) {
  Tag.find({}).then((tags) => { res.status(200).json(tags); })
    .catch((err) => { res.status(404).json({ message: err.message })});
}


/*** Get a Single Tag ***/
function edit_tag(req, res) { 
  Tag.findById(req.params.id).then((tags) => {res.status(200).json(tags)})
   .catch((err) => { res.status(404).json({ message: err.message })});
}


/*** Update Tag ***/
function update_tag(req, res) {
  Tag.findByIdAndUpdate(req.params.id, { name: req.body.name })
    .then(() => {
      Tag.findById(req.params.id).then((tag) => { res.status(200).send(tag); })
        .catch((err) => { res.status(500).send({ message: 'tag not updated, ' + err.message }); });
  }).catch((error) => { res.status(400).json({ message: "tag not found" }); });
}


/*** Remove Tag from Database ***/
function remove_tag(req, res) {
  Tag.findByIdAndDelete(req.params.id)
  .then(() => {res.status(200).json({ message: "Tag deleted successfully!"})})
  .catch((err) => {res.status(500).json({ message:err.message + " Tag not Deleted!!!"})});
}


/*** Export all functions ***/ 
module.exports = { get_tag, add_tag, edit_tag, update_tag, remove_tag };
