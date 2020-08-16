import passport from 'passport';
import db from '../db';
import bcrypt from 'bcrypt';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import logger from '../logger';

const DEFAULT_AUTH_SCHEME = 'JWT';
const AUTH_HEADER = 'authorization';
const AUTH_URL_PARAMETER = 'jwt_token';

const extractSalt = (hash) => {
  const patterns = [
    /^(\$2[ab]\$\d+\$.{22}).+/
  ];
  for (let iter = 0; iter < patterns.length; iter++) {
    const matching = hash.match(patterns[iter]);
    if (matching) {
      return matching[1];
    }
  }
  return '';
};

const customJwtExtractor = (req) => {
  const authHeader = req.headers[AUTH_HEADER];

  if (authHeader && !authHeader.startsWith(DEFAULT_AUTH_SCHEME + ' ')) {
    req.headers[AUTH_HEADER] = DEFAULT_AUTH_SCHEME + ' ' + authHeader;
  }

  return ExtractJwt.fromAuthHeaderWithScheme(DEFAULT_AUTH_SCHEME)(req) ||
    ExtractJwt.fromUrlQueryParameter(AUTH_URL_PARAMETER)(req);
};
const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: customJwtExtractor
};
const jwtAuthCallback = async (payload, done) => {
    logger.info(`payload: ${JSON.stringify(payload)}`);
  try {
    const user = await db.User.findOne({ where: { id: payload.id } });
    if (!user) return done(null, false, { message: 'User cannot be identificated' });
    done(null, user);
  } catch(ex) {
    done(ex);
  }
};
const localAuthCallback = async (login, password, done) => {
  var failureMessage = 'Login or password is incorrect';
  try {
    if (!login.length) return done({ message: 'Login should be presented' });
    const user = await db.User.findOne({ where: { login: login } });
    if (!user) return done(null, false, { message: failureMessage });
    const passSalt = extractSalt(user.password);
    const pressentedPassHash = await bcrypt.hash(password, passSalt);
    if (pressentedPassHash != user.password) return done(null, false, { message: failureMessage });
    done(null, user);
  } catch(ex) {
    done(ex);
  }
};

passport.use(new LocalStrategy({ usernameField: 'login', passwordField: 'password' }, localAuthCallback));
passport.use(new JwtStrategy(jwtOptions, jwtAuthCallback));

export default passport;