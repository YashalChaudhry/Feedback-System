const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!password || password !== adminPassword) {
    return res.status(401).json({ success: false, error: 'Invalid password' });
  }
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ success: true, token });
}; 