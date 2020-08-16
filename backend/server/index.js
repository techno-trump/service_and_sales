import express from 'express';
import bodyParser from 'body-parser';
import addRoutes from './router';
import logger from '../logger';
import morgan from 'morgan';

logger.info('Application started');

const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'));

addRoutes(app);
app.listen(process.env.PORT, () => logger.info('Listening'));