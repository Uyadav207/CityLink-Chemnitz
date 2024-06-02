const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'citylinktucsecret';

router.post('/auth', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { addresses: true, favouriteCategories: true } 
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check if the user's account is deleted
    if (user.isDeleted) {
      return res.status(401).json({ error: 'Account deleted. Cannot login.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token, user});
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
});

module.exports = router;
