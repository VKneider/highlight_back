import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import userCollection from "../models/user";
import "dotenv/config"

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

export default new Strategy(opts, async (payload, done) => {
  try {
    const user = await userCollection.findById(payload.id);
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    console.error(error);
  }
});
