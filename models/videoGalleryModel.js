const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
    {
        src: String,
    },
    {
        timestamps: true,
        toJSON: true,
    }
);

const VideoGallery = mongoose.model("VideoGallery", videoSchema);
module.exports = VideoGallery;
