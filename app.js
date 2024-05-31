const express = require('express');
const PostController = require('./controllers/post.controller');
const CommentController = require('./controllers/comment.controller');

const app = express();
app.use(express.json());
app.post('/', PostController.createPost);
app.get('/',PostController.getAllPosts);
app.patch('/:postId',PostController.updatePosts);
app.delete('/:postId',PostController.deletePosts);

app.post("/:postId/comments",CommentController.createComment);
app.get("/comments",CommentController.getAllComments);
// app.get("/:postId/comments",CommentController.getAllCommentByPost);


app.use((error, req,res,next) => {
    const status = error.status || 500;
    res.status(status).send(error.message || 'server error')
});


module.exports = app;