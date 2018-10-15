//import express from 'express';
//import http from 'http';
import express from 'express';
import logger from '../logger';
import db from '../db';

logger.info('Application started');

// db.sequelize.sync({ force: true, logging: console.log });

const app = express();

app.get('/', (req, res) => { res.send('ok') });

app.listen(8080, () => logger.info('Listening'));