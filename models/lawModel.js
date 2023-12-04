import { Schema, model, ObjectId } from 'mongoose';

const lawSchema = new Schema({
    imgSrc: {
      type: String,
      match: [
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
        'must be a valid URL',
      ],
    },
    article: [{
      type: ObjectId,
      ref: 'Article'
    }],
});

export default model('Law', lawSchema);
