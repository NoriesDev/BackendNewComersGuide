import { Schema, model, ObjectId } from 'mongoose';


const forumSchema = new Schema ({
    title: {
        type: String,
        maxlength: 255,
    },
    input: {
        type: String,
        maxlength: 500,
    },
    likes: {
        type: Number,
    },
    comments: {
        type: Number,
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
},
{
    timestamp: true
});