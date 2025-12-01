const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require("./db");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL, // use from .env
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const google_id = profile.id;
        const name = profile.displayName;
        const email = profile.emails[0].value;
        const profile_pic = profile.photos?.[0]?.value || null;

        // Check if user already exists
        const existing = await pool.query(
          "SELECT * FROM users WHERE google_id = $1",
          [google_id]
        );

        if (existing.rows.length > 0) {
          return done(null, existing.rows[0]); // return DB user
        }

        // Create user (password NULL for google users)
        const newUser = await pool.query(
          `INSERT INTO users (google_id, name, email, profile_pic)
           VALUES ($1, $2, $3, $4)
           RETURNING *`,
          [google_id, name, email, profile_pic]
        );

        return done(null, newUser.rows[0]);
      } catch (err) {
        console.error("Passport Error:", err);
        return done(err, null);
      }
    }
  )
);

// store only user id in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// fetch full user from DB
passport.deserializeUser(async (id, done) => {
  const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  done(null, user.rows[0]);
});

module.exports = passport;
