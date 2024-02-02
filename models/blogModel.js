const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        src: String,
        title: String,
        alt: String,
        subTitle: String,
    },
    {
        timestamps: true,
        toJSON: true,
    }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
