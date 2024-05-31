const createError = require("http-errors");
const Comment = require('../models/Comment');

module.exports.createComment = async(req, res, next)=>{
    try {
        const {body, params:{postId}} = req;
        const comment = await Comment.create({...body, 
            postId:postId});
        if(!comment){
            next(createError(400, 'try again!'))
        }
        res.status(201).send(comment)
    } catch (error) {
        next(error)
    }
};

module.exports.getAllComments = async(req, res, next)=>{
    try {
        // const comments = await Comment.find();
        //res.status(200).send(comments);
         await Comment.find()
        .populate("postId")
        .exec();
        // .exec((err,comments)=>{
        //     if(err){
        //         next(createError(400, "try again!"))
        //     }
        //     res.status(200).send(comments)
        // })
        
    } catch (error) {
       next(error) 
    }
};

module.exports.getAllCommentByPost = async(req, res, next)=>{
    try {
        const {params:{postId}} = req;
    } catch (error) {
       next(error) 
    }
};

// module.exports.createComment = async(req, res, next)=>{
//     try {
        
//     } catch (error) {
        
//     }
// };