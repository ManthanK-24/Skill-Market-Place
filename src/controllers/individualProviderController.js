const IndividualProvider = require('../models/IndividualProvider.js');

// @desc Register an Individual Provider
exports.registerIndividualProvider = async (req, res) => {
    try {
        const { firstName, lastName, email, mobileNumber, fullAddress } = req.body;

        if (!firstName || !lastName || !email || !mobileNumber) {
            return res.status(400).json({ message: 'First Name, Last Name, Email, and Mobile Number are required' });
        }

        const existingProvider = await IndividualProvider.findOne({ email });
        if (existingProvider) {
            return res.status(400).json({ message: 'Provider with this email already exists' });
        }

        const provider = await IndividualProvider.create({
            firstName,
            lastName,
            email,
            mobileNumber,
            fullAddress,
        });

        res.status(201).json({ message: 'Individual Provider registered successfully', provider });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc Get all Individual Providers
exports.getIndividualProviders = async (req, res) => {
    try {
        const providers = await IndividualProvider.find();
        res.status(200).json(providers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
