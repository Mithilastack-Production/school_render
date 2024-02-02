const Contact = require('../models/contactModel');

exports.getAll = async () => {
  return await Contact.find().sort({createdAt:-1});
};

exports.create = async (data) => {
  return await Contact.create(data);
};

exports.update = async (id, data) => {
  return await Contact.findByIdAndUpdate(id, data, { new: true });
};

exports.delete = async (id) => {
  return await Contact.findByIdAndDelete(id);
};
