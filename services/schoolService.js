const School = require('../models/schoolModel');

exports.getAll = async () => {
  return await School.find().sort({createdAt:-1});
};

exports.create = async (data) => {
  return await School.create(data);
};

exports.update = async (id, data) => {
  return await School.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await School.findByIdAndDelete(id);
};
