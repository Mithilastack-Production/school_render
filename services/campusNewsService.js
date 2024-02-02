const CampusNews = require('../models/campusNewsModel');

exports.getAll = async () => {
  return await CampusNews.find().sort({createdAt:-1});
};

exports.create = async (data) => {
  return await CampusNews.create(data);
};

exports.update = async (id, data) => {
  return await CampusNews.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await CampusNews.findByIdAndDelete(id);
};
