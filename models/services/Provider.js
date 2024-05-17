const mongoose = require("mongoose");
let providerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true," Provider Name is required!"],
  },
  service: {
    type: String,
    required: [true,"Provider Service is required!"],
  },
  image: {
    type: String,
    // required: [true,"Provider Image is required!"],
  },
  image_id: {
    type: String,
  },
  speed:{
    unit:String,
    type:Number,
    required: [true,"Provider Speed is required!"]
  },
  phone: {
    type: String,
    required: [true,"Provider's Phone is required!"],
    min: [8, "Phone Min Length is 8 characters"],
    max: [20, "Phone Max Length is 20 characters"],
  },
  offer: {
    type: String,
    required: [true,"Provider Offer is required!"]
  },
  description: {
    type: String,
    required: [true,"Provider Description is required!"]
  }  
});
const Provider = mongoose.model("Provider", providerSchema);
module.exports = Provider;
