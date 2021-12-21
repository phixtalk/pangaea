const { Schema } = require("mongoose");

const Subscriber = new Schema({
    url: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
});

module.exports = Subscriber;