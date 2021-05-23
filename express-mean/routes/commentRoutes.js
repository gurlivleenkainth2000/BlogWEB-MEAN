const express = require('express');
const { Comments } = require('./../schemas/comments');

var userId = "3fds324cs3132";
var username = "Developer";

const commentRoutes = () => {
    const routes = express.Router();

    routes.post('/comments', (req, res, next) => {
        // console.log(">>> Comment Request Body: ", req.body);
        const comment = new Comments({
            blogId: req.body.blogId,
            message: req.body.message,
            userId: req.body.userId,
            username: req.body.username,
        });
        comment.save((error, response) => {
            if(error) {
                res.status(500).json({ code: 500, message: 'Something went Wrong!! Please Try Again', detailed: error });
            }

            if(response) {
                res.status(200).json({ code: 200, message: 'Commented Added Successfully', detailed: response })
            }
        });
    });

    routes.get('/comments/:blogId', async (req, res, next) => {
        const commentsList = await Comments.find({ "blogId": req.params.blogId });
        res.status(200).json(commentsList);
    })

    return routes;
};


module.exports = { commentRoutes }