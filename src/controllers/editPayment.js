const Payment = require('../models/payment');
const dataParser = require('../utils/validate');

module.exports = {
    get: async function (req, res) {
        const { id } = req.query;

        const payment = await Payment.findOne({ _id: id }).lean();

        return res.render('formEdit', { payment });
    },
    put: async function (req, res) {
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
            res.render('failEditPayment', { errors: errors });
        } else {
            const { id, title, value, date, externalTax, comments } = req.body;
            const dateFormated = dataParser(date);

            const update = {
                title,
                value,
                date: dateFormated,
                externalTax,
                comments
            }

            let payment = await Payment.findByIdAndUpdate(id, update, function (err, result) {
                if (err) {
                    errors.push({ text: "Ocorreu um erro ao editar o pagamento" });
                    res.render('/listPayments', { errors: errors });
                };
            });

            return res.redirect('/lista');

        }
    },
}