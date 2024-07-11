const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const testRouters = require('./routers/test.routers');
const userRouters = require('./routers/user.routers');
const deckRouters = require('./routers/deck.routers');
const { errorHandling, handle404 } = require('./error/errorHandling');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(testRouters);
app.use(userRouters);
app.use(deckRouters);
app.use(handle404);
app.use(errorHandling);

module.exports = app;