const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let subscribeSchema = new mongoose.Schema({
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
  zip_code: {
    type: Number,
    required: [true, "Zip Code is Required"]
  }
});
const Subscription = mongoose.model("Subscription", subscribeSchema);
module.exports = Subscription;
