const Facility = require('../models/facilityModel');

exports.getAll = async () => {
  return await Facility.find().sort({createdAt:-1});
};

exports.create = async (data) => {
  return await Facility.create(data);
};

exports.update = async (id, data) => {
  return await Facility.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await Facility.findByIdAndDelete(id);
};
