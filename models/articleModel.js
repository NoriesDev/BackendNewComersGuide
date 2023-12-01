import { Schema, model } from 'mongoose';

const articleSchema = new Schema({

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
  });
  
  export default model('Article', articleSchema);