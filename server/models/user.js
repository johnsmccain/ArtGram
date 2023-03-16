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
    profileImage: { type: String },
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
