import mongoose from "mongoose";

const artSchema = mongoose.Schema({
    userId: {
        type:String,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    image: {
        type:String,
        required: true
    },
    desc: String,
    like: Array,
})

export default mongoose.model("Art", artSchema)