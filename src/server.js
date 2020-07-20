const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const routes = require('./routes');
const port = 3000;
const { urlConnect } = require('../config.json')

//CONNECTING DATABASE
mongoose.connect(urlConnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//CONFIG TEMPLATE ENGINE
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({ defaultLayout: 'main', layoutsDir: "./src/views/layout" }));
app.set('view engine', 'handlebars');

//CONFIG  BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

app.listen(port, () => {
    console.log(`Server up! http://localhost:3000`);
})