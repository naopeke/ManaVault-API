const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routers = require('./routers/routers');
const { errorHandling, handle404 } = require('./error/errorHandling');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routers);
app.use(handle404);
app.use(errorHandling);

module.exports = app;