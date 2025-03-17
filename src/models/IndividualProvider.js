const mongoose = require('mongoose');

const IndividualProviderSchema = new mongoose.Schema({
    providerType: { type: String, enum: ['IndividualProvider'], required: true, default: 'IndividualProvider' },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },

    fullAddress: {
        streetNumber: { type: String, required: true },
        streetName: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postCode: { type: String, required: true },
    },

}, { timestamps: true });

module.exports = mongoose.model('IndividualProvider', IndividualProviderSchema);
