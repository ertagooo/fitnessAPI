const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    name: String,
    duration: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "pending"
    }
});

module.exports = mongoose.model("Workout", workoutSchema);