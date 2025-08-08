// for storing user listening data
import mongoose, { Schema } from "mongoose";

const interactionSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",    // reference to User model
    },
    videoId: {
        type: String,
        required: true,
    },
    interactionScore: {
        type: Number,
        default: 1,    // 1 for 'listened' 
    },
},{timestamps: true});

interactionSchema.index({ userId: 1, videoId: 1, createdAt: -1});   // to ensure unique interactions per user and video

const Interaction = mongoose.models.Interaction || mongoose.model("Interaction", interactionSchema);
export default Interaction;