const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    Phone: Number,
    StartDate: Date
});

const Subscription = mongoose.model('details', SubscriptionSchema);
module.exports = Subscription;
