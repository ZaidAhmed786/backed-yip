const request = require("request");
let fs = require("fs");

const get_images = async (req, res) => {
  var delete_image = req.query.delete?req.query.delete: ''; 
   request.get({ url: "https://next.thepic.store/"}, async (err,httpRequest,response) =>{
            if(err) {
             return console.log("error sending image", err);
            } else {
                let data = response.split(",");
                console.log(typeof response, typeof data, data);
                res.render("../views/table.ejs", {data:response, removal:delete_image})
                // res.send(response);
            }
   })        
};
module.exports = {get_images}




// No Route
// router.get("/upload", (req, res) => {
//   let data = req.query.image?req.query.image: ''
//   let link = req.query.link?req.query.link: ''
//   res.render("../views/photo.ejs", {data:data, link:link});
// });
// router.post("/upload", upload.single("image"), add_image);

// router.get("/table", get_images);

// router.get("/remove", async (req, res) =>{ 
//   const {id} = req.query; 
//   const result =  await request.get( { url: `https://next.thepic.store/remove?id=${id}`}) 
//   if(result) {
//     console.log(result);
//     res.redirect("/table?delete="+"Image Deleted Successfully!!!");
//   }
// })

