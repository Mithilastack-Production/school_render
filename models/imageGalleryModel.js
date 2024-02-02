const mongoose = require("mongoose");

const imageGallerySchema = new mongoose.Schema(
    {
        src: String,
        text: String,
    },
    {
        timestamps: true,
        toJSON: true,
    }
);

const ImageGallery = mongoose.model("ImageGallery", imageGallerySchema);

module.exports = ImageGallery;
