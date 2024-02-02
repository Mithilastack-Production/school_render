const ImageGallery = require('../models/imageGalleryModel');

exports.getAll = async () => {
  return await ImageGallery.find().sort({createdAt:-1});
};

exports.create = async (data) => {
  return await ImageGallery.create(data);
};

exports.update = async (id, data) => {
  return await ImageGallery.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await ImageGallery.findByIdAndDelete(id);
};
