const Address = require("../../models/services/Address");
const { mongoose } = require("mongoose");


/*** Create New Address ***/
 exports.add_address = async (req, res) => {
  try {
    const address = {
      zip_from: req.body.zip_from && Number(req.body.zip_from),
      zip_to: req.body.zip_to && Number(req.body.zip_to),
      name: req.body.name ? req.body.name : "",
      providers: req.body.providers ? req.body.providers.map((provider) => mongoose.Types.ObjectId(provider)) : [],
    };
    const record = await Address.create(address);
    res.send(record);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}


/*** Get all Addresses from Database ***/
exports.get_address = async (req, res) => {
  if (!req.query.zip_code) {
    res.status(400).send({ message: "Please Enter a Zip Code" });
    return true;
  }
  let zip_code = Number(req.query.zip_code);
  let speed = req.query.speed && Number(req.query.speed);
  let addressQuery = {
    $or: [
      {
        $and: [
          { zip_from: { $lte: zip_code } },
          { zip_to: { $gte: zip_code } },
        ],
      },
      { $or: [{ zip_from: { $eq: zip_code } }, { zip_to: { $eq: zip_code } }] },
    ]
  };

  let speedQuery = req.query.speed ? { speed: { $gte: speed } } : "";
  const record = await Address.findOne({ ...addressQuery }).select("-zip_from -zip_to  -__v")
    .populate({ path: "providers", match: speedQuery, select: "-__v" });
  if (record === null) {
    res.status(400).send({ message: "please enter a valid zip code" });
  }
  if (record.providers.length < 1) {
    const record = await Address.findOne({ ...addressQuery }).select(" -zip_from -zip_to -__v").populate("providers");
    res.status(200).send(record);
    return true;
  }
  res.status(200).send(record);
}


/*** Get a Single Address ***/
exports.edit_address = async(req, res) => {
  Address.findById(req.params.id)
    .then((address) => res.json(address))
    .catch((err) => res.status(404).json({
      nocatsfound: "No address found", err
    })
  );
}


/*** Update Previous Address ***/
exports.update_address = async(req, res) => {
  const id = req.params.id;
  const { zip_from, name, zip_to, providers, wired, wireless, fiber, totalProviders, rank } = req.body;
  console.log(req.body);
  let address = await Address.findById(id);
  const data = {
    name: name || address.name,
    usage: {wired, wireless, fiber, rank, totalProviders} || address.usage,
    zip_from: zip_from || address.zip_from,
    zip_to: zip_to || address.zip_to,
    }
    providers: providers ? providers.map((provider) => mongoose.Types.ObjectId(provider)) : address.providers,
   
  Address.findByIdAndUpdate(id, { $set: data })
    .then(address => {
      Address.findById(id)
        .then(resp => { res.json(resp); })
        .catch((err => { res.status(404).json({ message: "record not found" + err }); }));
    }).catch((err) => { res.status(404).json({ message: "record not updated" + err }); });
}


/*** Remove Address ***/
exports.remove_address= async(req, res) =>{
  Address.findByIdAndDelete(req.params.id)
    .then((resp) => {
      res.status(200).send({ message: "address deleted successfully!" });
    })
    .catch((err) => {
      res.status(409).send({ message: err + " address failed to be deleted!" });
    });
}

 
