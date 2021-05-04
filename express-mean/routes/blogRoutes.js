const express = require('express');
const { Blog } = require('./../schemas/blog');

var userId = "3fds324cs3132";
var username = "Developer";

const blogRoutes = () => {
    const routes = express.Router();
    
    // Adding New Blog
    routes.post('/blogs', async (req, res, next) => {
        // const { title, description, published, archived, userId, username } = req.body;
        req.body.userId = userId;
        req.body.username = username

        const blog = new Blog({
            title: req.body.title,
            description: req.body.description,
            published: req.body.published,
            archived: req.body.archived,
            userId: req.body.userId,
            username: req.body.username
        });
        blog.save();
        res.status(200).json({ code: 200, message: 'successfully' })
        
    });

    // Fetching All Blogs
    routes.get('/blogs', async (req, res, next) => {
        const blogList = await Blog.find();
        res.status(200).json(blogList)
    });

    // Delete Blog
    routes.delete('/blogs/:blogId', (req, res, next) => {
        Blog.findByIdAndDelete(req.params.blogId, (error, response) => {
            if(error) {
                res.status(500).json({ code: 500, message: "Something went Wrong!! Please Try Again", detailed: error })
            }
            if(response) {
                res.status(200).json({ code: 200, message: "Blog Deleted Successfully", detailed: error })
            }
        })
    })

    return routes;
}

module.exports = { blogRoutes };