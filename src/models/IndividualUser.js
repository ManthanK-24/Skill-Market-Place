const mongoose = require('mongoose');

const individualUserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    fullAddress: {
        streetNumber: String,
        streetName: String,
        city: String,
        state: String,
        postCode: String
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('IndividualUser', individualUserSchema);
