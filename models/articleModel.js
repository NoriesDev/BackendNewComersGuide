import { Schema, model } from 'mongoose';

const articleSchema = new Schema({

      headline: {
        type: String,
        maxlength: 255,
      },
      paragraph: {
        type: String,
      }
  });
  
  export default model('Article', articleSchema);