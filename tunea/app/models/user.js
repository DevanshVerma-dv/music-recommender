import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: String,
    email: {type: String, unique: true},
    password: String,
}, { timestamps: true });   // adds createdAt and updatedAt fields

export default mongoose.models.User || mongoose.model("User", UserSchema);  // export the model, or use the existing one if it already exists