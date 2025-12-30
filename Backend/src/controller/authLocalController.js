const sql = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    // Check existing user
    const userExists = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (userExists.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    // Insert user
    const result = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashed})
      RETURNING id, name, email
    `;

    const token = generateToken(result[0]);

    res.json({ token, user: result[0] });

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN USER
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (users.length === 0)
      return res.status(400).json({ message: "User not found" });

    const user = users[0];

    if (!user.password)
      return res.status(400).json({ message: "This user uses Google login only" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGOUT
exports.logoutUser = (req, res) => {
  res.json({ message: "Logout successful" });
};
