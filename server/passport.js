import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

const User = require('./models/User');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

module.exports = function setupPassport() {
  passport.use(
    new Strategy(options, (payload, done) => {
      User.findOne({ _id: payload._id }, (error, user) => {
        if (error) {
          return done(error, false);
        }
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    }),
  );
};
