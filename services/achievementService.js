const Archievement = require('../models/achievementModel');

exports.getAll = async () => {
  return await Archievement.find().sort({createdAt:-1});
};

exports.create = async (data) => {
  return await Archievement.create(data);
};

exports.update = async (id, data) => {
  return await Archievement.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await Archievement.findByIdAndDelete(id);
};
