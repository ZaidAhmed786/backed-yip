const Device = require("../../models/services/Device");


module.exports = {

  /*** Get All Devices from Database ***/
  add_device: async (req, res) => {
    try {
      const { name, basic, average, pro } = req.body;   
      const speed = { basic, average, pro };
      const record = await Device.create({ name, speed });
      res.send(record);
    } 
    catch (err) {
      err.name ==="MongoServerError" && err.code === 11000 
      ? res.status(400).send({message:"Device already exists"})
      : res.status(400).send({message:err.message});
    }
  },


  /*** Get Devices from Database ***/
  get_device: async (req, res) => {
    Device.find()
    .then((device) => res.json(device))
    .catch((err) =>
      res.status(404).json({
       message: "No Device found " + err
      })
    );
  },


  /*** edit an existing device ***/
  edit_device: async (req, res) => {
    Device.findById(req.params.id)
      .then(device=>{res.status(200).json(device)})
      .catch(err =>{res.status(404)
        .json({ message: "No Device found " + err })
      })
  },


  /*** update device ***/
    update_device: async (req, res) => {
      const { name, basic, average, pro } = req.body;
      const speed = { basic, average, pro };
      let record = { name, speed };
      try {
        const device = await Device.findByIdAndUpdate(req.params.id, record , {
          new: true,
          runValidators: true
        });
        res.status(200).json(device);
      } catch (err) {
        res.status(404).json({message: err.message});
      }
  },


  /*** Remove a Device ***/
  remove_device: async (req, res) => {
    try {
      await Device.findByIdAndDelete(req.params.id)
      res.status(200).send({ message: "device deleted successfully!" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },


  /*** Main Function ***/
};
