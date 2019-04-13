import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './router';

import accountsRouter from './router/account';

require('dotenv').config();

// calling an instance of express
const app = express();

// logging all request to console using morgan
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/api/v1', router);
app.use('/api/v1', accountsRouter);

export default app;