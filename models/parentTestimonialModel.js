const mongoose = require("mongoose");

const parentTestimonialSchema = new mongoose.Schema(
    {
        src: String,
    },
    {
        timestamps: true,
        toJSON: true,
    }
);

const ParentTestimonial = mongoose.model(
    "ParentTestimonial",
    parentTestimonialSchema
);

module.exports = ParentTestimonial;
 