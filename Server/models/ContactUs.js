const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: false,
    },

    message: {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        countrycode: { type: String, required: true },
        message: { type: String, required: true },
        submittedAt: { type: Date, default: Date.now },
    },

});

module.exports = mongoose.model("ContactUs", contactUsSchema);
