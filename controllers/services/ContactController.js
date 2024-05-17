const Contact = require("../../models/services/Contact");


module.exports = {

  /*** Add Contact Us Message to Database ***/
  input_contact_us: async (req, res) => {
    const { email, message } = req.body;   
    let data = { email, message };
      const record = Contact.create(data)
      record.then((resp) => {res.send(resp)})
      .catch((err) =>
       res.status(400).json({
        message: err.message
      })
    );
  },


  /*** Get Contact Us messages from Database ***/
  get_contact_us: async (req, res) => {
    Contact.find()
    .then((response) => res.json(response))
    .catch((err) =>
      res.status(404).json({
       message: err.message
      })
    );
  },


  /*** edit an existing contact us message ***/
  edit_contact_us: async (req, res) => {
    Contact.findById(req.params.id)
      .then(response => {res.status(200).json(response)})
      .catch(err =>{res.status(404)
        .json({ message: err.message })
      })
  },


  /*** Remove a Message ***/
  remove_contact_us : (req, res) => {
    Contact.findByIdAndDelete(req.params.id)
      .then((resp) => {
      res.status(200).send({ message: "contact us record deleted successfully!" });
      })
      .catch(err =>{res.status(409)
        .json({ message : err.message })
      })
  },


  /*** Main Function ***/
};
