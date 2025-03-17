const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: "Provider" }, // Assigned provider
    category: { type: String, required: true },
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    expectedStartDate: { type: Date, required: true },
    expectedWorkingHours: { type: Number, required: true },
    hourlyRateOffered: { type: Number, required: true },
    rateCurrency: { type: String, enum: ["USD", "AUD", "SGD", "INR"], required: true },
    status: {
        type: String,
        enum: ["pending", "in_progress", "completion_requested", "completed"],
        default: "pending",
    },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
