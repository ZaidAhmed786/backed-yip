const express = require("express");
const router = express.Router(); 
//-- ****************  Middleware Imports **************** --// 
const { verifyToken } = require("../middleware/AuthMiddleware");
const upload = require("../middleware/MulterMiddleware"); 

//-- *********** Import Controller Functions *********** --//
const {get_category,input_category,edit_category,update_category,remove_category} = require("../controllers/solitary/CategoryController");
const {get_tag,add_tag,edit_tag,update_tag,remove_tag} = require("../controllers/solitary/TagsController");
const  {get_blog, add_blogs, edit_blog, update_blogs, remove_blogs}  = require("../controllers/solitary/BlogsController");


//   // Solitary Blogs
  router.route("/blog")
  .get(get_blog) /*** Get all Blogs ***/
  .post(upload.single("blog"), add_blogs); /*** Add New Blog ***/
router.route("/blog/:id")
  .get(edit_blog) /*** Get a Single Blog ***/
  .patch(upload.single("blog"), update_blogs) /*** Update Existing Blog ***/
  .delete(remove_blogs) /*** Remove Blog ***/

//! *** Categories Routes *** !//
router.route('/category')
  .get(get_category) /*** Get all Categories ***/
  .post(input_category); /*** Add New Category ***/
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



// -- /*** Export all Routes ***/ -- // 
module.exports = router;