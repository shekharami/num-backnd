const express = require('express');
const path = require('path');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const placeRouter = require('./routes/placeRouter');

const app = express();

app.use(helmet());
//data sanitization against NoSQL query injection
app.use(mongoSanitize());


//data sanitixzation against xss attacks
app.use(xss());

app.use(express.json());

app.use('/', placeRouter);


module.exports = app;