import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type:String,
        required: true
    },
    profileImage: String
},{timestamps: true})

export default mongoose.model("User", userSchema);