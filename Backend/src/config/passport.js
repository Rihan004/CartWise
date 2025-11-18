const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require("./db");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const google_id = profile.id;
        const name = profile.displayName;
        const profile_pic = profile.photos[0].value;

        // Check if user exists
        const existing = await pool.query(
          "SELECT * FROM users WHERE google_id=$1",
          [google_id]
        );

        if (existing.rows.length > 0) {
          return done(null, existing.rows[0]);
        }

        // Create new user
        const result = await pool.query(
          `INSERT INTO users (google_id, name, email, profile_pic)
           VALUES ($1, $2, $3, $4)
           RETURNING *`,
          [google_id, name, email, profile_pic]
        );

        return done(null, result.rows[0]);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Required for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const result = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
  done(null, result.rows[0]);
});

module.exports = passport;
