const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title: String,
    description: String,
    published: Boolean,
    userId: String,
    username: String 
}, {
    timestamps: true,
    autoIndex: true
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = { BlogSchema, Blog };