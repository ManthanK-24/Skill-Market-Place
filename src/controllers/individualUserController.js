const IndividualUser = require('../models/IndividualUser');

// ✅ Create Individual User
exports.createIndividualUser = async (req, res) => {
    try {
        const { firstName, lastName, email, mobileNumber, fullAddress } = req.body;

        if (!firstName || !lastName || !email || !mobileNumber) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newUser = new IndividualUser({ firstName, lastName, email, mobileNumber, fullAddress });
        await newUser.save();

        res.status(201).json({ message: 'Individual user created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// ✅ Get Individual User
exports.getIndividualUser = async (req, res) => {
    try {
        const user = await IndividualUser.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// ✅ Update Individual User
exports.updateIndividualUser = async (req, res) => {
    try {
        const updatedUser = await IndividualUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// ✅ Delete Individual User
exports.deleteIndividualUser = async (req, res) => {
    try {
        const deletedUser = await IndividualUser.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
