const express = require('express');
const { Blog } = require('./../schemas/blog');

const blogRoutes = () => {
    const routes = express.Router();

    // Fetching All Blogs
    routes.get('/blogs', async (req, res, next) => {
        const blogList = await Blog.find();
        res.status(200).json(blogList)
    });

    // Adding New Blog
    routes.post('/blogs', async (req, res, next) => {
        
    })

    return routes;
}

module.exports = { blogRoutes };