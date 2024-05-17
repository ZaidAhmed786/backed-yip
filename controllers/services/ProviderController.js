const Provider = require("../../models/services/Provider");
const cloudinary = require("../../utils/cloudinary");

const add_provider = async (req, res) => {
  try {
    const { name, service, speed, phone, offer, description } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Provider image is required!" });
    }

    const image_upload = await cloudinary.uploader.upload(req.file.path);
    const speeds = Number(speed);

    const provider = {
      name, service, phone, offer, description,
      image: image_upload.secure_url,
      image_id: image_upload.public_id,
      speed: speeds
    };

    const record = await Provider.create(provider);
    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while adding the provider." });
  }
};

const get_provider = async (req, res) => {
  try {
    const providers = await Provider.find(req.query);
    res.status(200).json(providers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while retrieving providers." });
  }
};

const edit_provider = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    res.status(200).json(provider);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while retrieving the provider." });
  }
};

const update_provider = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, service, speed, phone, offer, description } = req.body;

    let item = await Provider.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Provider not found!" });
    }

    let result;
    if (req.file) {
      await cloudinary.uploader.destroy(item.image_id);
      result = await cloudinary.uploader.upload(req.file.path);
    }

    const data = {
      name: name || item.name,
      image: result && result.secure_url,
      image_id: result && result.public_id,
      service: service || item.service,
      phone: phone || item.phone,
      offer: offer || item.offer,
      description: description || item.description,
      speed: speed ? Number(speed) : item.speed,
    };

    const provider = await Provider.findByIdAndUpdate(id, { $set: data }, { new: true });
    if (provider) {
      res.status(200).json(provider);
    } else {
      res.status(404).json({ message: "Provider not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while updating the provider." });
  }
};

const remove_provider = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    await cloudinary.uploader.destroy(provider.image_id);
    await Provider.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Provider deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while deleting the provider." });
  }
};

module.exports = { add_provider, get_provider, edit_provider, update_provider, remove_provider };
