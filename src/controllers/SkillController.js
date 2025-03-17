const Skill = require('../models/Skill');

exports.createSkill = async (req, res) => {
    try {
        const { providerId, providerType, category, experience, natureOfWork, hourlyRate } = req.body;

        if (!providerId || !providerType || !category || !experience || !natureOfWork || !hourlyRate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const skill = await Skill.create({ provider: providerId, providerType, category, experience, natureOfWork, hourlyRate });

        res.status(201).json({ message: 'Skill created successfully', skill });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateSkill = async (req, res) => {
    try {
        const { skillId } = req.params;
        const { experience, natureOfWork, hourlyRate } = req.body;

        // Validate required fields
        if (!experience && !natureOfWork && !hourlyRate) {
            return res.status(400).json({ message: 'At least one field (experience, natureOfWork, or hourlyRate) must be provided for update' });
        }

        // Validate natureOfWork
        if (natureOfWork && !['onsite', 'online'].includes(natureOfWork)) {
            return res.status(400).json({ message: 'Invalid value for natureOfWork. Allowed values: onsite, online' });
        }

        // Find and update the skill
        const updatedSkill = await Skill.findByIdAndUpdate(
            skillId,
            { $set: { experience, natureOfWork, hourlyRate } },
            { new: true, runValidators: true }
        );

        if (!updatedSkill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        res.status(200).json({ message: 'Skill updated successfully', skill: updatedSkill });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
