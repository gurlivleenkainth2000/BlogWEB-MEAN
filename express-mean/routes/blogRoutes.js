const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { Blog } = require('./../schemas/blog');

var userId = "3fds324cs3132";
var username = "Developer";

const blogRoutes = () => {
    const routes = express.Router();
    const storage = multer.diskStorage({
        destination: 'uploads/',
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    });
    const upload = multer({ storage: storage });
    
    // Adding New Blog
    routes.post('/blogs', upload.single('imageUrl'), async (req, res, next) => {
        console.log(">>> Request Body: ", req.body.title);
        console.log(">>> Request File: ", req.file);
        // const { title, description, published, archived, userId, username } = req.body;
        req.body.userId = userId;
        req.body.username = username

        const blog = new Blog({
            title: req.body.title,
            description: req.body.description,
            published: req.body.published,
            archived: req.body.archived,
            userId: req.body.userId,
            username: req.body.username,
            imageUrl: req.file != undefined ? req.file.path : null
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
    routes.patch('/blogs/:blogId', upload.single('imageUrl'), (req, res) => {
        req.body.imageUrl = req.file != undefined ? req.file.originalname : req.body.imageUrl;
        Blog.findByIdAndUpdate(req.params.blogId, {
            title: req.body.title,
            description: req.body.description,
            published: req.body.published,
            archived: req.body.archived,
            userId: req.body.userId,
            username: req.body.username,
            imageUrl: req.file != undefined ? req.file.path : req.body.imageUrl
        }, (error, response) => {
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
                // console.log(response);
                res.status(200).json({ code: 200, message: "Blog Deleted Successfully", detailed: response })
            }
        })
    })

    return routes;
}

module.exports = { blogRoutes };