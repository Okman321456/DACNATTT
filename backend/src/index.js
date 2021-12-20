require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');

const routes = require('../src/routes')
const db = require('./config/db')
db.connect()

const app = express();
const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(morgan('combined'));

app.use('/', routes);

app.listen(port, () => console.log(`Server is listening on port ${port}`));