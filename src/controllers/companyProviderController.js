const CompanyProvider = require('../models/CompanyProvider');

exports.registerCompanyProvider = async (req, res) => {
    try {
        const { companyName, phoneNumber, businessTaxNumber, representative, email, mobileNumber, fullAddress } = req.body;
        if (!companyName) {
            return res.status(400).json({ message: 'companyName is required' });
        }
        if (!phoneNumber) {
            return res.status(400).json({ message: 'phoneNumber is required' });
        }
        if (!businessTaxNumber) {
            return res.status(400).json({ message: 'businessTaxNumber is required' });
        }
        if (!representative || !representative.firstName || !representative.lastName) {
            return res.status(400).json({ message: 'Representative firstName and lastName are required' });
        }
        if (!email) {
            return res.status(400).json({ message: 'email is required' });
        }
        if (!mobileNumber) {
            return res.status(400).json({ message: 'mobileNumber is required' });
        }

        const providerExists = await CompanyProvider.findOne({ email });
        if (providerExists) {
            return res.status(400).json({ message: 'Provider already exists' });
        }

        const newProvider = await CompanyProvider.create({
            companyName,
            phoneNumber,
            businessTaxNumber,
            representative,
            email,
            mobileNumber,
            fullAddress
        });

        res.status(201).json({ message: 'Company Provider registered successfully', provider: newProvider });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc Get all Company Providers
exports.getCompanyProviders = async (req, res) => {
    try {
        const providers = await CompanyProvider.find();
        res.status(200).json(providers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
