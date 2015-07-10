var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({

    created_at: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('cord2', postSchema);