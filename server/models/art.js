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
    description: { type: String, default: 'Art' },
    category: { type: String },
    postedBy: {
      type: ObjectId,
      required: true,
    },
    likes: [{ type: ObjectId, ref: 'User' }],
    comments: [
      {
        text: String,
        postedBy: {
          type: ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Art', artSchema);
