const { Router } = require('express');
const addPayments = require('./controllers/addPayment');
const listPayments = require('./controllers/listPayments');
const editPayment = require('./controllers/editPayment');
const deletePayment = require('./controllers/deletePayment');
const receiveFile = require('./controllers/receiveFile');
const routes = Router();

routes.get('/', (req, res) => {
    res.render('formAdd');
})

routes.post('/addPayment', addPayments);

routes.get('/lista', listPayments);

routes.get('/editPayment', editPayment.get);

routes.post('/editPayment', editPayment.put);

routes.get('/deletePayment', deletePayment);

routes.get('/uploadPlanilha', receiveFile.get);

routes.post('/uploadPlanilha', receiveFile.post);

module.exports = routes;       
