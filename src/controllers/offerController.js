const Offer = require("../models/Offer.js");
const Task = require("../models/Task.js");
const IndividualProvider = require("../models/IndividualProvider.js");
const CompanyProvider = require("../models/CompanyProvider.js");
const mongoose = require("mongoose");

exports.makeOffer = async (req, res) => {
    try {
        const { providerId, providerType, taskId, offerAmount } = req.body;

        // Validate input
        if (!providerId || !providerType || !taskId || !offerAmount) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if provider exists
        let provider;
        if (providerType === "IndividualProvider") {
            provider = await IndividualProvider.findById(providerId);
        } else if (providerType === "CompanyProvider") {
            provider = await CompanyProvider.findById(providerId);
        } else {
            return res.status(400).json({ message: "Invalid provider type" });
        }

        if (!provider) {
            return res.status(404).json({ message: "Provider not found" });
        }

        // Check if task exists
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Prevent duplicate offers from the same provider for the same task
        const existingOffer = await Offer.findOne({ provider: providerId, task: taskId });
        if (existingOffer) {
            return res.status(400).json({ message: "Offer already submitted for this task" });
        }

        // Create offer
        const offer = new Offer({
            provider: providerId,
            providerType,
            task: taskId,
            offerAmount,
            status: "pending",
        });

        await offer.save();

        res.status(201).json({ message: "Offer submitted successfully", offer });
    } catch (error) {
        console.error("Error making offer:", error);
        res.status(500).json({ message: "Server error" });
    }
};



exports.acceptOrRejectOffer = async (req, res) => {
    try {
        const { offerId, status, userId, providerId } = req.body;

        if (!offerId) {
            return res.status(400).json({ message: "Offer ID is required" });
        }

        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        if (!providerId) {
            return res.status(400).json({ message: "Provider ID is required" });
        }

        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status. Use 'accepted' or 'rejected'." });
        }

        // Find the offer and populate task details
        const offer = await Offer.findById(offerId).populate("task");
        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        // Ensure only the user who posted the task can accept/reject the offer
        if (offer.task.user.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized: Only the task creator can accept/reject offers." });
        }

        // Prevent modification if offer is already processed
        if (offer.status !== "pending") {
            return res.status(400).json({ message: "Offer has already been processed" });
        }

        // Update the offer status
        offer.status = status;
        await offer.save();

        // If accepted, update task with provider ID
        if (status === "accepted") {
            offer.task.provider = new mongoose.Types.ObjectId(providerId);
            await offer.task.save(); // Save the task with the new provider
        }

        return res.status(200).json({ message: `Offer ${status} successfully`, offer });
    } catch (error) {
        console.error("Error processing offer:", error);
        res.status(500).json({ message: "Server error" });
    }
};