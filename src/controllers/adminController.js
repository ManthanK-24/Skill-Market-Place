const IndividualProvider = require('../models/IndividualProvider');
const CompanyProvider = require('../models/CompanyProvider');
const Task = require('../models/Task');

exports.getProviderCount = async (req, res) => {
    try {
        const individualCount = await IndividualProvider.countDocuments();
        const companyCount = await CompanyProvider.countDocuments();
        const totalProviders = individualCount + companyCount;

        res.status(200).json({
            success: true,
            totalProviders,
            individualProviders: individualCount,
            companyProviders: companyCount
        });
    } catch (error) {
        console.error("Error fetching provider count:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.getTotalTasksPosted = async (req, res) => {
    try {
        const { from, to } = req.query;

        if (!from || !to) {
            return res.status(400).json({ message: "Both 'from' and 'to' dates are required" });
        }

        const fromDate = new Date(from);
        const toDate = new Date(to);

        const totalTasks = await Task.countDocuments({ createdAt: { $gte: fromDate, $lte: toDate } });

        res.status(200).json({ success: true, totalTasks });
    } catch (error) {
        console.error("Error fetching total tasks posted:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.getTotalSuccessfulTasks = async (req, res) => {
    try {
        const { from, to } = req.query;

        if (!from || !to) {
            return res.status(400).json({ message: "Both 'from' and 'to' dates are required" });
        }

        const fromDate = new Date(from);
        const toDate = new Date(to);

        const successfulTasks = await Task.countDocuments({
            status: 'completed',
            createdAt: { $gte: fromDate, $lte: toDate }
        });

        res.status(200).json({ success: true, successfulTasks });
    } catch (error) {
        console.error("Error fetching successful tasks:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


exports.getTotalRejectedTasks = async (req, res) => {
    try {
        const { from, to } = req.query;

        if (!from || !to) {
            return res.status(400).json({ message: "Both 'from' and 'to' dates are required" });
        }

        const fromDate = new Date(from);
        const toDate = new Date(to);

        const rejectedTasks = await Task.countDocuments({
            status: 'rejected',
            createdAt: { $gte: fromDate, $lte: toDate }
        });

        res.status(200).json({ success: true, rejectedTasks });
    } catch (error) {
        console.error("Error fetching rejected tasks:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



