const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let addressSchema = new mongoose.Schema({
  zip_from: {
    type: Number,
    required : [true, "Zip Code Starting-From is Required!"]
  },
  zip_to: {
    type: Number,
    required : [true, "Zip Code Ending-To is Required!"]
  },
  name: {
    type:String
  },
  usage: {
    wired:String,
    wireless:String,
    fiber:String,
    rank:String,
    totalProviders:String
  },
  providers:[{ type: Schema.Types.ObjectId, ref: 'Provider' }]
});
const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
