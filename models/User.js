const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    description: { type: String, default: '' },
    startLocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    distanceTraveled: { type: Number, default: 0 }, // in kilometers
    locationHistory: [{
        latitude: Number,
        longitude: Number,
        timestamp: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('User', userSchema);
