import { Schema, model } from 'mongoose';

const lawSchema = new Schema({
    Title: {
      type: String,
      maxlength: 255,
      match: [
        /^[a-zA-Z\s.-]+$/,
        'must contain only letters and max 255 characters long',
      ],
    },
    law: {
        type: String,
      },
    imgSrc: [{
      type: String,
      match: [
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
        'must be a valid URL',
      ],
    }],
  });
  
  export default model('Law', lawSchema);