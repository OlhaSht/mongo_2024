const mongoose = require('mongoose');
const {contentSchema, emailSchema} = require('../utils/schemaValidation');
const { Schema } = mongoose;

const commentSchema = new Schema({
    comment:{
        type:text,
        validate:{
            validator: (v)=>contentSchema.isValidSync(v),    ///[a-z0-9\s\.,!?]{5,256}/i.test test это метод регулярки, все это заменили методом yup
            message: (props) => `${props.value} is not a valid content!`
        }
    },
    author:{
        email:{
            type: String,
            validate:{
                validator: (v)=>emailSchema.isValidSync(v),
                message: (props) => `${props.value} is not a valid content!`
            }
        },
    },
    createAt:{
        default:now
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;