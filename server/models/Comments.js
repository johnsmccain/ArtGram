import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    userId: String,
    text: String
});

export default mongoose.model("Comments", commentSchema);