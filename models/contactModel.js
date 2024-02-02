const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: String,
        phone:String,
        email: String,
        who:String,
        why:String,
        message:String,
        responded:Boolean,
    },
    {
        timestamps: true,
        toJSON: true,
    }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
