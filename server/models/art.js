import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const artSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    tags: [{ type: String }],
    postedBy: {
      type: ObjectId,
      required: true,
    },
    comments: [
      {
        type: ObjectId,
        ref: 'Comment',
      },
    ],
    description: { type: String, default: 'Art' },
    likes: [{ type: ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export default mongoose.model('Art', artSchema);
