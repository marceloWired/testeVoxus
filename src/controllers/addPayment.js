const Payment = require('../models/payment');
const dataParser = require('../utils/validate');

module.exports = async function (req, res) {
    const errors = [];

    if (!req.body.title || req.body.title.length < 5 || req.body.title.length > 100) {
        errors.push({ text: 'Campo nome deve conter de 5 a 100 caracteres' });
    }

    if (!req.body.value || isNaN(req.body.value)) {
        errors.push({ text: 'Campo valor inválido' });
    }

    if (!req.body.date) {
        errors.push({ text: 'Campo data inválido' });
    }

    if (errors.length > 0) {
        return res.render('formAdd', { errors: errors })
    } else {
        const { title, value, date, comments } = req.body;
        let externalTax = (value * 0.05).toFixed(2);

        console.log(title, value, date, comments);

        // TRANSFORMING DATE
        const dateFormated = dataParser(date);

        Payment.create({
            title,
            value,
            date: dateFormated,
            externalTax,
            comments
        }, function (err, res) {
            if (err) return handleError(err);
        });

        return res.redirect('/');
    }
}
