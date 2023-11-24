import { Schema, model } from 'mongoose';

const articleSchema = new Schema({
    title: {
      type: String,
      maxlength: 255,
      match: [
        /^[a-zA-Z\s.-]+$/,
        'must contain only letters and max 255 characters long',
      ],
    },
    imgSrc: [{
      type: String,
      required: true,
      match: [
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
        'must be a valid URL',
      ],
    }],
    article: [{
      headline: {
        type: String,
        maxlength: 255,
        match: [
        /^[a-zA-Z\s.-]+$/,
        'must contain only letters and max 255 characters long',
      ],
      },
      paragraph: {
         type: String,
      }
    }],
    usefulLinks: [{
        type: String,
        match: [
          /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
          'must be a valid URL',
        ],
      }],
  });
  
  export default model('Article', articleSchema);