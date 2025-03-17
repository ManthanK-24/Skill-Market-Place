const mongoose = require('mongoose');

const CompanyProviderSchema = new mongoose.Schema({
    providerType: { type: String, enum: ['CompanyProvider'], required: true, default: 'CompanyProvider' },

    companyName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    businessTaxNumber: {
        type: String,
        required: true,
        unique: true,
        match: /^[A-Z0-9]{10}$/, // Must be exactly 10 characters with capital letters and digits
    },

    representative: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },

    fullAddress: {
        streetNumber: { type: String },
        streetName: { type: String },
        city: { type: String },
        state: { type: String },
        postCode: { type: String },
    },

}, { timestamps: true });

module.exports = mongoose.model('CompanyProvider', CompanyProviderSchema);
