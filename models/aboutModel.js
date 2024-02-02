const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
    {
        isOpposite: Boolean,
        heading: String,
        message: String,
        src: String,
        alt: String,
    },
    {
        timestamps: true,
        toJSON: true,
    }
);

const About = mongoose.model("About", aboutSchema);

module.exports = About;
