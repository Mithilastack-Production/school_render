const Hero = require('../models/heroModel');

exports.getAll = async () => {
  return await Hero.find().sort({createdAt:-1});
};

exports.create = async (data) => {
  return await Hero.create(data);
};

exports.update = async (id, data) => {
  return await Hero.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await Hero.findByIdAndDelete(id);
};
