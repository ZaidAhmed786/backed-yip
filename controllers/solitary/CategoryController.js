const Category = require("../../models/solitary/Category");
module.exports = {
  /*** Add Contact Us Message to Database ***/
  input_category: async (req, res) => {  
    try {
      console.log(req.body);
        const category = await Category.create({name: req.body.name});
        res.status(200).json({
          status:'success', 
          data:{
            category
          }
        });
    }  
    catch (err) {
        res.status(401).json({status: 'fail', message:err.message});
    }
  },

  /*** Get Contact Us messages from Database ***/
  get_category: async (req, res) => {
    try {
        let categories = await Category.find();
        res.status(200).json({
          status:'success',
          results: categories.length,
          data:{
            categories
          }
          });
    } catch (err) { 
        res.status(401).json({status:'fail', message: err.message});
    }
  },

  /*** edit an existing contact us message ***/
  edit_category: async (req, res) => {
    try {
      const category =  await Category.findById(req.params.id)
      res.status(200).json({
        status:'success', 
        data: {
          category
        }
      })
    } catch (err) {
      res.status(401).json({status:'fail', message: err.message})
    }
      
  },

    /*** Update Category ***/
   update_category: async(req, res) => {
    try {
      console.log(req.body);
      const category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true,
        runValidators: true
      });
        res.status(200).json({
          status:'success', 
          data:{
            category
          }
          });
    } catch (err) {
        res.status(401).json({status:'fail', message:err.message});
    }
  },

  /*** Remove a Message ***/
  remove_category : async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.status(204).json({status:'success', data: null});
    } catch (err) {
      res.status(404).json({status:'fail', message: err.message})
    }
  }, 
};