const Payment = require('../models/payment');

module.exports = async function (req, res) {
    const paymentsResult = await Payment.find({});
    const payments = [];
    for (let b = 0; b < paymentsResult.length; b++) {
        payments.push({
            id: paymentsResult[b]._id,
            title: paymentsResult[b].title,
            value: paymentsResult[b].value,
            date: paymentsResult[b].date,
            externalTax: paymentsResult[b].externalTax,
            comments: paymentsResult[b].comments
        });
    }

    return res.render('listPayments', { payments: payments });
}