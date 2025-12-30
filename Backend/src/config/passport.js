const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const sql = require("./db");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const google_id = profile.id;
        const name = profile.displayName;
        const email = profile.emails?.[0]?.value || null;
        const profile_pic = profile.photos?.[0]?.value || null;

        // 🔍 Check if user exists
        const existing = await sql`
          SELECT * FROM users WHERE google_id = ${google_id}
        `;

        if (existing.length > 0) {
          return done(null, existing[0]);
        }

        // ➕ Create new Google user
        const newUser = await sql`
          INSERT INTO users (google_id, name, email, profile_pic)
          VALUES (${google_id}, ${name}, ${email}, ${profile_pic})
          RETURNING *
        `;

        return done(null, newUser[0]);
      } catch (err) {
        console.error("Passport Google Error:", err);
        return done(err, null);
      }
    }
  )
);

// 🔐 Store only user id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// 🔄 Fetch full user from DB
passport.deserializeUser(async (id, done) => {
  try {
    const users = await sql`
      SELECT * FROM users WHERE id = ${id}
    `;
    done(null, users[0]);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
