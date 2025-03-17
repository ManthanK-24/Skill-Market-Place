const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'providerType', // Dynamic reference
        required: true
    },
    providerType: {
        type: String,
        enum: ['IndividualProvider', 'CompanyProvider'],
        required: true
    },
    category: { type: String, required: true },
    experience: { type: Number, required: true },
    natureOfWork: { type: String, enum: ['onsite', 'online'], required: true },
    hourlyRate: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
