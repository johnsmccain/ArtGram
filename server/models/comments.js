import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    userId: {
        type:String,
        required: true
    },
    artId: {
        type:String,
        required: true
    },
    text: String
});

export default mongoose.model("Comments", commentSchema);