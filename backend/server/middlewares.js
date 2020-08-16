import { pick } from 'lodash';
import passport from './passport';
import logger from '../logger';
import jwt from 'jsonwebtoken';

export const localAuth = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
      logger.info(`err: ${err}, user: ${user}, info: ${info}`);
    if (err || !user) {
        return res.status(400).json(err || info);
    }
    req.login(user, {session: false}, (err) => {
       if (err) res.status(400).send(err);
       // generate a signed json web token with the contents of user object and return it in the response
       const token = jwt.sign(pick(user, ['id', 'name', 'surname']), process.env.JWT_SECRET);
       return res.status(200).json({ token });
    });
  })(req, res);
};

export const jwtAuth = (req, res, next) => {
  return passport.authenticate('jwt', { session: false }, (err, user, info) => {
      logger.info(`err: ${err}, user: ${user}, info: ${info}`);
    if (err || !user) {
      return res.status(400).json(err || info);
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
}