const Payment = require('../models/payment');

module.exports = function (title, value, date, comments) {
    let externalTax = (value * 0.05).toFixed(2);

    Payment.create({
        title,
        value,
        date,
        externalTax,
        comments
    }, function (err, res) {
        if (err) return handleError(err);
    });
}
