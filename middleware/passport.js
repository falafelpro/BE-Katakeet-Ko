const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const User = require("../db/models/User");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config/keys");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });

    const correctPassword = user
      ? await bcrypt.compare(password, user.password)
      : false;

    correctPassword ? done(null, user) : done(null, false);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (payload, done) => {
    Date.now() > payload.exp ? done(null, false) : false;
    try {
      const user = await User.findById(payload._id);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
