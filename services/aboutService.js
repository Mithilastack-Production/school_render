const About = require('../models/aboutModel');

exports.getAll = async () => {
  return await About.find().sort({createdAt:-1});
};

exports.create = async (data) => {
  return await About.create(data);
};

exports.update = async (id, data) => {
  return await About.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await About.findByIdAndDelete(id);
};
