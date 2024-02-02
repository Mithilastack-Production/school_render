const ParentTestimonial = require('../models/parentTestimonialModel');

exports.getAll = async () => {
  return await ParentTestimonial.find().sort({createdAt:-1});
};

exports.create = async (data) => {
  return await ParentTestimonial.create(data);
};

exports.update = async (id, data) => {
  return await ParentTestimonial.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await ParentTestimonial.findByIdAndDelete(id);
};
