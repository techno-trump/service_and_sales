import express from 'express';
import passport from './passport';
import { localAuth, jwtAuth } from './middlewares';
import { getUsersList, getUserById } from './controllers/api/commands/user';

export default (app) => {
  const api = express.Router();
  const v1 = express.Router();
  
  v1.use('/user/login', localAuth);
  v1.use('/user/list', jwtAuth, getUsersList);
  v1.use('/user/:id', jwtAuth, getUserById);
  
  
  api.use('/v1', v1);
  app.use('/api', api);
}