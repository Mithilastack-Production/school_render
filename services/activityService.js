const Activity = require('../models/activityModel');

exports.getAll = async () => {
  return await Activity.find().sort({createdAt:-1});
};

exports.create = async (data) => {
  return await Activity.create(data);
};

exports.update = async (id, data) => {
  return await Activity.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await Activity.findByIdAndDelete(id);
};
