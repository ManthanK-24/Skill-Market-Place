const CompanyUser = require('../models/CompanyUser');

// ✅ Create Company User
exports.createCompanyUser = async (req, res) => {
    try {
        const { companyName, phoneNumber, businessTaxNumber, representative, email, mobileNumber, fullAddress } = req.body;

        if (!companyName || !phoneNumber || !businessTaxNumber || !representative?.firstName || !representative?.lastName || !email || !mobileNumber) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newUser = new CompanyUser({ companyName, phoneNumber, businessTaxNumber, representative, email, mobileNumber, fullAddress });
        await newUser.save();

        res.status(201).json({ message: 'Company user created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// ✅ Get Company User
exports.getCompanyUser = async (req, res) => {
    try {
        const user = await CompanyUser.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// ✅ Update Company User
exports.updateCompanyUser = async (req, res) => {
    try {
        const updatedUser = await CompanyUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// ✅ Delete Company User
exports.deleteCompanyUser = async (req, res) => {
    try {
        const deletedUser = await CompanyUser.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
