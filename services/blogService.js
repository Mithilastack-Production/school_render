const Blog = require('../models/blogModel');

exports.getAll = async () => {
  return await Blog.find();
};

exports.create = async (data) => {
  return await Blog.create(data).sort({createdAt:-1});
};

exports.update = async (id, data) => {
  return await Blog.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await Blog.findByIdAndDelete(id);
};
