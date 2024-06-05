const mongoose = require('mongoose');
const {contentSchema} = require('../utils/schemaValidation');
const { Schema } = mongoose;

const commentSchema = new Schema({
    comment:{
        type:String,
        required: true,
        validate:{
            validator: (v)=>contentSchema.isValidSync(v),    ///[a-z0-9\s\.,!?]{5,256}/i.test test это метод регулярки, все это заменили методом yup
            message: (props) => `${props.value} is not a valid content!`
        }
    },
    author:{
        login:{
            type: String,
            default: 'anonymous'
        },
    },
    createAt:{
        type: Date,
        default:Date.now
    },
    postId:{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
},                     
{versionKey:false,     //options
  timestamps: true  
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;