const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema(
    {
        src: String,
        alt: String,
    },
    {
        timestamps: true,
        toJSON: true,
    }
);

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;
