const CallToAction = require("../../models/services/Cta");

module.exports = {
  add_cta: async (req, res) => {
    const { email, number } = req.body;
    let data = { email, number };
    const record = CallToAction.create(data);
    record
      .then((resp) => {
        res.send(resp);
      })
      .catch((err) =>
        res.status(400).json({
          message: err.message,
        })
      );
  },

  get_cta: async (req, res) => {
    CallToAction.find()
      .then((response) => res.json(response))
      .catch((err) =>
        res.status(404).json({
          message: err.message,
        })
      );
  },

  single_cta: async (req, res) => {
    CallToAction.findById(req.params.id)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(404).json({ message: err.message });
      });
  },

  /*** update cta ***/
  patch_cta: async (req, res) => {
    const { number, email } = req.body;
    console.log(req.body);
    let record = { number, email };
    try {
      const data = await CallToAction.findByIdAndUpdate(req.params.id, record, {
        new: true,
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
  remove_cta: async(req, res) => {
    let record = await CallToAction.findById(req.params.id)
    if(!record) {
        return res.status(404).send({ message: "Record not Found!" });
    }
    CallToAction.findByIdAndDelete(req.params.id)
      .then((resp) => {
        res
          .status(200)
          .send({ message: "Record Deleted Successfully!" });
      })
      .catch((err) => {
        res.status(409).json({ message: err.message });
      });
  },

  /*** Main Function ***/
};
