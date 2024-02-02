const parentTestimonialService = require('../services/parentTestimonialService');

exports.getAll = async (req, res) => {
  try {
    const parentTestimonials = await parentTestimonialService.getAll();
    res.json(parentTestimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const parentTestimonial = await parentTestimonialService.create(req.body);
    res.json(parentTestimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedParentTestimonial = await parentTestimonialService.update(req.params.id, req.body);
    if (!updatedParentTestimonial) {
      res.status(404).json({ error: 'Image not found' });
    } else {
      res.json(updatedParentTestimonial);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedParentTestimonial = await parentTestimonialService.delete(req.params.id);
    if (!deletedParentTestimonial) {
      res.status(404).json({ error: 'Image not found' });
    } else {
      res.json({ message: 'Image deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
