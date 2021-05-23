const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
    published: Boolean,
    archived: Boolean,
    imageUrl: String,
    userId: String,
    username: String
}, {
    timestamps: true,
    autoIndex: true
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = { BlogSchema, Blog };