const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    message: String,
    blogId: String,
    userId: String,
    username: String
}, {
    timestamps: true,
    autoIndex: true
});

const Comments = mongoose.model('Comments', CommentSchema);

module.exports = { CommentSchema, Comments };