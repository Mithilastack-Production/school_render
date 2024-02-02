
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/userModel');

console.log(process.env.ACCESS_TOKEN_SECRET);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "sdjkhlkjlfhdjkhfsdgdskhgf",
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.sub);
      if (!user) {
        return done(null, false);
      } 
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;
