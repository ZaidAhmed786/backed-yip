 const cloudinary = require("../../utils/cloudinary");
 const {uploadFile} = require("../../middleware/s3")
 const add_image = async (req, res) => {
    try {
        const fileUpload = await uploadFile(req.file);
        res.json("Image Uploaded Successfully: Link= " + fileUpload.Location);
    } catch (err) {
        res.json({message:"Failed " + err.message})
    }
};
const remove_image = async (req, res) => {
    console.log(req.params.id);
    await cloudinary.uploader.destroy(req.params.id, (resp) => {
        res.json({message: "Image Deleted Successfully!!!"})    
    });
};
module.exports = {add_image, remove_image}




