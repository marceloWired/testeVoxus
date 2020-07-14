const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const readExcel = require('../utils/readExcel')
const axios = require('axios');
const FormData = require('form-data');
const addPayment = require('../utils/addPayment');

module.exports = {
    get: function (req, res) {
        res.render('formUpload');
    },
    post: async function (req, res) {
        const form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            let oldPath = files.filetoupload.path;
            let newPath = path.join(__dirname, '../../uploads/' + files.filetoupload.name);

            fs.rename(oldPath, newPath, function (err) {
                if (err) throw err;
                let data = readExcel(newPath);

                addPayment(data['Título'], data['Valor'], data['Data do Lançamento'], data['Observações']);

                res.redirect('/lista');
                res.end();
            });
        })
    }
}