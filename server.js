const http = require('http');
const express = require('express');
const yup = require("yup");
const mongoose = require('mongoose');
const createError = require("http-errors");
const { Schema } = mongoose;

const emailSchema = yup.string().email('Incorrect email');
const contentSchema = yup.string().matches(/^[a-z0-9\s]{5,225}$/i).required('Content is required');

const postSchema = new Schema({
    content:{
        type: String,
        required: true,
        validate:{
            validator: (v)=>contentSchema.isValidSync(v),    ///[a-z0-9\s\.,!?]{5,256}/i.test test это метод регулярки, все это заменили методом yup
            message: (props) => `${props.value} is not a valid content!`
        }
    },
    author:{
        login:String,
        email:{
            type: String,
            validate:{
                validator: (v)=>emailSchema.isValidSync(v),
                message: (props) => `${props.value} is not a valid content!`
            }
        },
        rate:Number
    },
    isCorrect:{ type:Boolean, default: false},
    publishAt: { type: Date, default: Date.now },
});
const Post = mongoose.model('Post', postSchema);

mongoose.connect('mongodb://127.0.0.1:27017/mongo_2024')
    .catch((err)=>console.log(err.message))

const app = express();
app.use(express.json());
app.post('/', async(req, res, next)=>{
    try {
        const{body} = req;
        const newPost = await Post.create(body);
        if(!newPost){
            next (createError(400));
        }
        res.status(201).send(newPost)
    } catch (error) {
        next(error)
    }
});
app.get('/', async (req, res, next)=>{
    try {
        const posts = await Post.find();
        res.status(201).send(posts);
    } catch (error) {
        next(error)
    }
});

app.use((error, req,res,next) => {
    res.status(400).send(error.message)
});

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=>{
    console.log('server start at port = ' + PORT);
})