const express = require('express');
const cors = require('cors');
const generalRouters = require('./routers/routers');
const { errorHandling, handle404 } = require('./error/errorHandling');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(generalRouters); // routers.jsで定義されたルーターを使用する

// 404 Not Foundのエラーハンドリングを追加
app.use(handle404);

// エラーハンドリングミドルウェアを最後に追加
app.use(errorHandling);

module.exports = app;
