const jwt    = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User   = require('../models/User');

// ── Register ──────────────────────────────────────────────────────────────────
exports.register = async (req, res) => {
  try {
    console.log('BODY REÇU:', req.body);
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.status(201).json({
      token,
      user: {
        id:          user._id,
        email:       user.email,
        role:        user.role,
        fullName:    user.fullName    ?? null,
        companyName: user.companyName ?? null,
        filiere:     user.filiere     ?? null,
      },
    });
  } catch (err) {
    console.error('ERREUR REGISTER:', err.message);
    res.status(400).json({ error: err.message });
  }
};

// ── Login ─────────────────────────────────────────────────────────────────────
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password))
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({
      token,
      user: {
        id:          user._id,
        email:       user.email,
        role:        user.role,
        fullName:    user.fullName    ?? null,   // ← ajouté
        companyName: user.companyName ?? null,   // ← ajouté
        filiere:     user.filiere     ?? null,   // ← ajouté
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};