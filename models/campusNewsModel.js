const mongoose = require("mongoose");

const campusNewsSchema = new mongoose.Schema(
    {
        src: String,
        title:String,
        alt:String,
        subTitle: String,
    },
    {
        timestamps: true,
        toJSON: true,
    }
);

const CampusNews = mongoose.model("CampusNews", campusNewsSchema);

module.exports = CampusNews;
