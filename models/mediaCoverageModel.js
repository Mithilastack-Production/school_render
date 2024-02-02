const mongoose = require("mongoose");

const mediaCoverageSchema = new mongoose.Schema(
    {
        src: String,
        text: String,
    },
    {
        timestamps: true,
        toJSON: true,
    }
);

const MediaCoverage = mongoose.model("MediaCoverage", mediaCoverageSchema);

module.exports = MediaCoverage;
