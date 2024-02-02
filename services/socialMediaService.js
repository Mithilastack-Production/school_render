const SocialMedia = require('../models/socialMediaModel');

// Service methods
exports.getAll = async () => {
  return await SocialMedia.find().sort({createdAt:-1});
};

exports.create = async (data) => {
  return await SocialMedia.create(data);
};

exports.update = async (id, data) => {
  return await SocialMedia.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await SocialMedia.findByIdAndDelete(id);
};
