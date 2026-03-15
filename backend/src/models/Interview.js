import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        required:true
    },
    content: {
        type: String,
        required:true
    }
},{timestamps:true})


const InterviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
   role: {
       type: String,
       required:true
    },
    experience: {
        type: String,
        required:true
    },
    interviewType: {
        type: String,
        required:true
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'abandoned'],
        default:'active',
        required:true
    },
    messages: [messageSchema],
    overallScore: {
        type: Number,
        min: 0,
        max: 100,
        default:null
    },
    feedback: {
        type: String,
        default:null
    },
    completedAt: {
        type: Date,
        default:null
    }
},{timestamps:true}
)

const Interview = mongoose.model("Interview", InterviewSchema)
export default Interview