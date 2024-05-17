const express = require("express");
const router = express.Router();
//-- ****************  Middleware Imports **************** --// 
const { verifyToken } = require("../middleware/AuthMiddleware");
const upload = require("../middleware/MulterMiddleware");
let Blog = require("../models/dashboard/blog");
//-- *********** Import Controller Functions *********** --//
const { postLogin, resetPassword, newPassword } = require("../controllers/dashboard/AuthController");
const addressController = require("../controllers/services/AddressController");
const { get_provider, add_provider, remove_provider, edit_provider, update_provider } = require("../controllers/services/ProviderController");
const { get_blogs, add_blog, single_blog, update_blog, remove_blog } = require("../controllers/dashboard/BlogController");
const { get_category, add_category, edit_category, update_category, remove_category } = require("../controllers/dashboard/CategoryController");
const { get_tag, add_tag, edit_tag, update_tag, remove_tag } = require("../controllers/dashboard/TagsController");
const { get_device, add_device, edit_device, update_device, remove_device } = require("../controllers/services/DeviceController");
const { get_users, add_user, edit_user, update_user, remove_user } = require("../controllers/dashboard/UserController");
const { add_image, remove_image } = require("../controllers/template/image");
const { get_images } = require("../controllers/template/table");
const { get_subscriber, add_subscriber, edit_subscriber, remove_subscriber } = require("../controllers/services/SubscriptionController");
const { input_contact_us, get_contact_us, edit_contact_us, remove_contact_us } = require("../controllers/services/ContactController");

const { get_cta, add_cta, single_cta, remove_cta, patch_cta } = require("../controllers/services/CtaController");



//-- ********************* Routes ********************* --// 

//! *** Blog Routes *** !//
router.route("/blog")
  .get(get_blogs) /*** Get all Blogs ***/
  .post(upload.single("blog"), add_blog); /*** Add New Blog ***/
router.route("/blog/:id")
  .get(single_blog) /*** Get a Single Blog ***/
  .patch(upload.single("blog"), update_blog) /*** Update Existing Blog ***/
  .delete(verifyToken, remove_blog) /*** Remove Blog ***/

//! *** Categories Routes *** !//
router.route('/category')
  .get(get_category) /*** Get all Categories ***/
  .post(add_category); /*** Add New Category ***/
router.route('/category/:id')
  .get(edit_category) /*** Get a Single Category ***/
  .put(verifyToken, update_category) /*** Update Existing Category ***/
  .delete(verifyToken, remove_category); /*** Remove Category ***/

//! *** Tags Routes *** !//
router.route("/tag")
  .get(get_tag) /*** Get all Tags ***/
  .post(add_tag); /*** Add New Tag ***/
router.route("/tag/:id")
  .get(edit_tag) /*** Get a Single Tag ***/
  .put(update_tag) /*** Update Existing Tag ***/
  .delete(verifyToken, remove_tag); /*** remove tag ***/

//! *** Device Routes *** !//
router.route("/device")
  .get(get_device) /*** Get all Devices ***/
  .post(add_device); /*** Add New Device ***/
router.route("/device/:id")
  .get(edit_device) /*** Get a Single Device ***/
  .put(verifyToken, update_device) /*** Update Existing Device ***/
  .delete(verifyToken, remove_device); /*** remove device ***/

//! *** Subscription Routes *** !//
router.route("/subscribe")
  .get(get_subscriber) /*** Get all Subscribers ***/
  .post(add_subscriber) /*** Add New Subscriber ***/
router.route("/subscribe/:id")
  .get(edit_subscriber) /*** Get a Single Subscriber ***/
  .delete(remove_subscriber) /*** Remove Subscriber ***/

//! *** Contact Us Routes *** !//
router.route("/contact")
  .get(get_contact_us) /*** Get all Messages ***/
  .post(input_contact_us) /*** Add New Message ***/
router.route("/contact/:id")
  .get(edit_contact_us) /*** Get a Single Message ***/
  .delete(remove_contact_us) /*** Remove Message ***/

//! *** Call to Action Routes *** !//
router.route("/cta")
  .get(get_cta) /*** Get all Messages ***/
  .post(add_cta) /*** Add New Message ***/
router.route("/cta/:id")
  .patch(patch_cta) /*** Get a Single Message ***/
  .get(single_cta) /*** Get a Single Message ***/
  .delete(remove_cta) /*** Remove Message ***/

//! *** Address Routes *** !//
router.route("/address")
  .post(addressController.add_address)  /*** Add New Address ***/
  .get(addressController.get_address);  /*** Get all Addresses ***/
router.route("/address/:id")
  .get(addressController.edit_address) /*** Get a Single Address ***/
  .put(addressController.update_address)  /*** Update Existing Address ***/
  .delete(addressController.remove_address);  /*** remove address ***/

//! *** Provider Routes *** !//
router.route("/provider")
  .get(get_provider) /*** Get all Providers ***/
  .post(upload.single("provider"), add_provider);
router.route("/provider/:id")
  .get(edit_provider) /*** Get a Single Provider ***/
  .put(verifyToken, upload.single("provider"), update_provider) /*** Update Existing Provider ***/
  .delete(verifyToken, remove_provider); /*** remove device ***/

//! *** Admin Routes *** !//
router.post("/login", postLogin);  /*** Login User ***/
router.post("/reset", resetPassword);  /*** Reset User Password ***/
router.post("/new-password", newPassword);  /*** Add New Password ***/

//! *** User Routes *** !//
router.route("/user")
  .get(get_users) /*** Get all Users ***/
  .post(verifyToken, add_user);  /*** Add New User ***/
router.route("/user/:id")
  .get(verifyToken, edit_user) /*** Edit User ***/
  .put(verifyToken, verifyToken, upload.single("profile"), update_user)  /*** Update Existing User ***/
  .delete(verifyToken, remove_user);  /*** Remove User ***/

//! *** Image Hosting ***!//
router.get("/upload", (req, res) => {
  let data = req.query.image ? req.query.image : ''
  let link = req.query.link ? req.query.link : ''
  res.render("../views/photo.ejs", { data: data, link: link });
});
router.post("/upload", upload.single("image"), add_image);
router.get("/table", get_images);
router.delete("/remove/:id", remove_image);


//! *** Template Routes *** !//
router.get("/", (req, res) => { res.send("<h1>Your Internet Provider</h1>") });  /*** Main Route ***/


// -- /*** Export all Routes ***/ -- // 
module.exports = router;
