const Payment = require('../models/payment');

module.exports = async function (req, res) {
    const { id } = req.query;

    let payment = await Payment.findByIdAndDelete({ _id: id });

    res.redirect('/lista');
}