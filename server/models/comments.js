import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  artId: {
    type: String,
    ref: 'Art',
    required: true,
  },
});

export default mongoose.model('Comments', commentSchema);
