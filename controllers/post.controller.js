const createError = require("http-errors");
const Post = require('../models/post');

module.exports.createPost = async(req, res, next)=>{
    try {
        const{body} = req;
        const post = await Post.create(body)
            if(!post){
                next(createError(400, 'try again'));//это не работает(( 
            }
            res.status(201).send(post);
    } catch (error) {
        next(error)
    }
}

module.exports.getAllPosts = async (req, res, next)=>{
    try {
        const posts = await Post.find();
        res.status(201).send(posts);
    } catch (error) {
        next(error)
    }
}
module.exports.getPostsById = async (req, res, next)=>{
    try {
        const {body, params:{postId}} = req;
        const posts = await Post.findById(postId, body, {new:true});
        res.status(201).send(posts);
    } catch (error) {
        next(error)
    }
}

module.exports.updatePosts = async (req, res, next)=>{
    try {
        const {body, params:{postId}} = req;
        const post = await Post.findByIdAndUpdate(postId, body,
             {new:true}, {runValidators:true})
        //тут долна быть обработка ошибки через if
        res.status(200).send(post);
    } catch (error) {
        next(error);
    }
}
module.exports.deletePosts = async (req, res, next)=>{
    try {
        const {params:{postId}} = req;
        const post = await Post.findByIdAndDelete(postId);
        //тут долна быть обработка ошибки через if
        if(!post){
            next(createError(404, 'post not found!'))
        }
        res.status(200).send(post);
    } catch (error) {
        next(error);
    }
}