const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const {
            userId,
            userType,
            category,
            taskName,
            description,
            expectedStartDate,
            expectedWorkingHours,
            hourlyRateOffered,
            rateCurrency
        } = req.body;

        // Validate required fields
        if (!userId) return res.status(400).json({ message: "User ID is required" });
        if (!userType) return res.status(400).json({ message: "User type is required" });
        if (!category) return res.status(400).json({ message: "Category is required" });
        if (!taskName) return res.status(400).json({ message: "Task name is required" });
        if (!description) return res.status(400).json({ message: "Description is required" });
        if (!expectedStartDate) return res.status(400).json({ message: "Expected start date is required" });
        if (!expectedWorkingHours) return res.status(400).json({ message: "Expected working hours are required" });
        if (!hourlyRateOffered) return res.status(400).json({ message: "Hourly rate offered is required" });
        if (!rateCurrency) return res.status(400).json({ message: "Rate currency is required" });

        // Validate expectedStartDate format
        if (isNaN(Date.parse(expectedStartDate))) {
            return res.status(400).json({ message: "Invalid date format for expected start date" });
        }

        // Validate rateCurrency
        const allowedCurrencies = ["USD", "AUD", "SGD", "INR"];
        if (!allowedCurrencies.includes(rateCurrency)) {
            return res.status(400).json({ message: "Invalid rate currency. Allowed values: USD, AUD, SGD, INR" });
        }

        // Create the task with default status and no provider initially
        const task = await Task.create({
            user: userId,
            userType,
            category,
            taskName,
            description,
            expectedStartDate,
            expectedWorkingHours,
            hourlyRateOffered,
            rateCurrency,
            status: "pending", // Default status
            provider: null, // No provider assigned initially
        });

        res.status(201).json({ message: "Task created successfully", task });

    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.acceptOrRejectTaskCompletion = async (req, res) => {
    try {
        const { taskId, userId, status } = req.body;

        if (!taskId || !userId || !status) {
            return res.status(400).json({ message: "Task ID, user ID, and status are required" });
        }

        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status. Use 'accepted' or 'rejected'." });
        }

        // Find the task
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Ensure only the task owner can approve/reject
        if (task.user.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized: Only the task owner can accept/reject task completion." });
        }

        // Ensure task was marked as "completion_requested"
        if (task.status !== "completion_requested") {
            return res.status(400).json({ message: "Task must be in 'completion_requested' state to approve/reject." });
        }

        // Update status based on user decision
        task.status = status === "accepted" ? "completed" : "in_progress";
        await task.save();

        return res.status(200).json({ message: `Task completion ${status} successfully`, task });
    } catch (error) {
        console.error("Error accepting/rejecting task completion:", error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.markTaskAsCompleted = async (req, res) => {
    try {
        const { taskId, providerId } = req.body;

        if (!taskId || !providerId) {
            return res.status(400).json({ message: "Task ID and provider ID are required" });
        }

        // Find the task
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Ensure only the assigned provider can mark it as completed
        if (!task.provider || task.provider.toString() !== providerId) {
            return res.status(403).json({ message: "Unauthorized: Only the assigned provider can mark this task as completed." });
        }

        // Prevent re-marking if already completed
        if (task.status === "completed" || task.status === "completion_requested") {
            return res.status(400).json({ message: "Task has already been marked as completed or is pending approval." });
        }

        // Update status to "completion_requested"
        task.status = "completion_requested";
        await task.save();

        return res.status(200).json({ message: "Task completion requested successfully", task });
    } catch (error) {
        console.error("Error marking task as completed:", error);
        res.status(500).json({ message: "Server error" });
    }
};