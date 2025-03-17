const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
    {
        provider: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "providerType",
            required: true,
        },
        providerType: {
            type: String,
            enum: ["IndividualProvider", "CompanyProvider"],
            required: true,
        },
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            required: true,
        },
        offerAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
