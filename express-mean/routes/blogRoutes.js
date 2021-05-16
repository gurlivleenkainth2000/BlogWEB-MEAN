const express = require('express');
const { Blog } = require('./../schemas/blog');

var userId = "3fds324cs3132";
var username = "Developer";

const blogRoutes = () => {
    const routes = express.Router();
    
    // Adding New Blog
    routes.post('/blogs', async (req, res, next) => {
        console.log(req.body);
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
        blog.save((error, response) => {
            if(error) {
                res.status(500).json({ code: 500, message: 'Something went Wrong!! Please Try Again', detailed: error });
            }

            if(response) {
                res.status(200).json({ code: 200, message: 'Blog Added Successfully', detailed: response })
            }
        });
        // if(req.body.title != "" && req.body.description != "") {
        // } else {
        // }
        
    });

    // Updating Particular Blog
    routes.put('/blogs/:blogId', (req, res) => {
        Blog.findByIdAndUpdate(req.params.blogId, req.body, (error, response) => {
            if(error) {
                res.status(500).json({ code: 500, message: 'Something went Wrong!! Please Try Again', detailed: error });
            }

            if(response) {
                res.status(200).json({ code: 200, message: 'Blog Updated Successfully', detailed: response })
            }
        })
    })

    // Fetching All Blogs
    routes.get('/blogs', async (req, res, next) => {
        const blogList = await Blog.find().sort({ 'createdAt': -1 });
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