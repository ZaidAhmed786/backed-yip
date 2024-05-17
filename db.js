require('dotenv').config();
const mongoose = require("mongoose");
const dbconfig = mongoose.set("strictQuery", false);
const db = process.env.db;
mongoose.connect(db)
  .then((res) => {
    console.log("database connection established");
  })
  .catch((err) => {
    console.log("error connecting to database, ", err);
  });
  module.export = { dbconfig };
