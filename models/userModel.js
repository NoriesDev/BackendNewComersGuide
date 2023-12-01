import { Schema, model } from 'mongoose';


const userSchema = new Schema({
    userName: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      maxlength: 20,
      matches: [/^[a-zA-Z]+$/, 'must contain only letters  and between 4 and 20 characters']
    },
    password: {
      type: String,
      required: true,
     select: false,
     maxlength: 100,
     match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,60}$/,
        'must contain at least one uppercase letter, one lowercase letter, one number and be between 8 and 20 characters long',
      ],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            'is not a valid email',
          ],
      },
      active: {
        type: Boolean,
        default: true,
      },

  },
  {
    timestamp: true,
  }
  );
  
  export default model('User', userSchema);