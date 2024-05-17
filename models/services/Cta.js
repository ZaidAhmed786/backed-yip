const mongoose = require("mongoose");
let ctaSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required!"],
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email address",
    },
  },
  number: {
    type: String,
    required: [true, "Number is Required"],
  },
});
const CallToAction = mongoose.model("Cta", ctaSchema);
module.exports = CallToAction;
