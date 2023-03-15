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
    postedBy: {
      type: ObjectId,
      required: true,
    },
    desc: { type: String },
    likes: [{ type: ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export default mongoose.model('Art', artSchema);
