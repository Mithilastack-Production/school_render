const VideoGallery = require('../models/imageGalleryModel');

exports.getAll = async () => {
  return await VideoGallery.find().sort({createdAt:-1});
};

exports.create = async (data) => {
  return await VideoGallery.create(data);
};

exports.update = async (id, data) => {
  return await VideoGallery.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await VideoGallery.findByIdAndDelete(id);
};
