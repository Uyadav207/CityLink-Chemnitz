const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET|| 'citylinktucsecret';

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ error: 'Login failed', details: error.message });
    }
  });


  module.exports = router;