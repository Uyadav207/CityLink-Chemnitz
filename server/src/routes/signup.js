const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

router.post('/auth', async (req, res) => {
    const { username, password, firstName, lastName, address, phoneNo, email} = req.body;
  
    try {

    const existingUser = await prisma.user.findUnique({where: {username}});
    if (existingUser) return res.status(400).json({error: 'Username Already Existed'});
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          firstName,
          lastName,
          address,
          phoneNo,
          email
        },
      });
  
      res.status(201).json({ message: 'User created', user });
    } catch (error) {
      res.status(400).json({ error: 'User creation failed', details: error.message });
    }
  });

  module.exports = router;