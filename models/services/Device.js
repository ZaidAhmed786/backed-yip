const mongoose = require("mongoose");
let deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Device Must have a Name!"],
    trim: true,
    unique: true
  },
  speed:{
    basic:{
      type: String,
      required: [true, "Device Must have a Basic Speed!"]
    },
    average:{
      type: String,
      required: [true, "Device Must have an Average Speed!"]
    },
    pro:{
      type: String,
      required: [true, "Device Must have a Pro Speed!"]
    },
  }
  });
const Device = mongoose.model("Device", deviceSchema);
module.exports = Device;
 