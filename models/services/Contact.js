const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    validate: {
        validator: function(v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
        },
        message: "Please enter a valid email address"
    }
  },
  message: {
    type: String,
    required: [true, "Message is Required"]
  }
});
const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
