const mongoose = require("mongoose");

const socialMediaSchema = new mongoose.Schema(
    {
        href: String,
        src: String,
        alt: String,
    },
    {
        timestamps: true,
        toJSON: true,
    }
);

const SocialMedia = mongoose.model("SocialMedia", socialMediaSchema);
module.exports = SocialMedia;
