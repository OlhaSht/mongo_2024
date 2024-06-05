const mongoose = require('mongoose');
const {contentSchema, emailSchema} = require('../utils/schemaValidation');
const { Schema } = mongoose;

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
},
{
    versionKey:false,     //options
    timestamps: true  
});
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
