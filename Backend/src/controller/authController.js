const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      profile_pic: user.profile_pic,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

exports.googleCallback = (req, res) => {
  const token = generateToken(req.user); // req.user is from DB

  // Redirect to frontend with JWT only
  res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
};
