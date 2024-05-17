const Subscription = require("../../models/services/Subscription");


module.exports = {

  /*** Add Subscribers to Database ***/
  add_subscriber: async (req, res) => {
    const { email, zip_code } = req.body;   
    let data = { email, zip_code };
      const record = Subscription.create(data);
      record.then((resp) => {res.send(resp)})
      .catch((err) =>
       res.status(400).json({
        message: err.message
      })
    );
  },


  /*** Get Subscribers from Database ***/
  get_subscriber: async (req, res) => {
    Subscription.find()
    .then((subscriber) => res.json(subscriber))
    .catch((err) =>
      res.status(404).json({
       message: err.message
      })
    );
  },


  /*** edit an existing subscriber ***/
  edit_subscriber: async (req, res) => {
    Subscription.findById(req.params.id)
      .then(subscriber => {res.status(200).json(subscriber)})
      .catch(err =>{res.status(404)
        .json({ message: err.message })
      })
  },


  /*** Remove a Subscriber ***/
  remove_subscriber: (req, res) => {
    Subscription.findByIdAndDelete(req.params.id)
      .then((resp) => {
      res.status(200).send({ message: "subscriber deleted successfully!" });
      })
      .catch(err =>{res.status(409)
        .json({ message: "record not deleted" + err.message })
      })
  },


  /*** Main Function ***/
};
