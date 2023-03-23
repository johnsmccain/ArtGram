import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default:
        'https://firebasestorage.googleapis.com/v0/b/artgram-project.appspot.com/o/default%20avatar.png?alt=media&token=5822996f-6951-4268-aa57-a6aa5081b156',
    },
    Followers: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
    Following: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
  },

  { timestamps: true }
);

export default mongoose.model('User', userSchema);
