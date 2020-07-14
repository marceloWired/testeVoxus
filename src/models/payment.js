const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    title: String,
    value: Number,
    date: Date,
    externalTax: Number,
    comments: String
});

module.exports = mongoose.model('Payment', PaymentSchema);