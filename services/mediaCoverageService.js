const MediaCoverage = require('../models/mediaCoverageModel');

exports.getAll = async () => {
  return await MediaCoverage.find().sort({createdAt:-1});
};

exports.create = async (data) => {
  return await MediaCoverage.create(data);
};

exports.update = async (id, data) => {
  return await MediaCoverage.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await MediaCoverage.findByIdAndDelete(id);
};
