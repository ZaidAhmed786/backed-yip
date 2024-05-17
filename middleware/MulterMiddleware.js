const multer = require("multer");
const storage = multer.diskStorage({
    filename: function (req, file, cb) { 
      cb(null, file.originalname)
    }
  })
module.exports = multer({ storage: storage })

