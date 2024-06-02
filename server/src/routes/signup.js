const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

router.post('/auth', async (req, res) => {
    const { username, password, firstName, lastName, email, phoneNo } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await prisma.user.findUnique({
            where: { username: username, email: email },
        });

        if (existingUser) {
            return res.status(409).json({ message: 'Username or Email already taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in the database
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                firstName,
                lastName,
                email,
                phoneNo,
            },
        });

        res.status(201).json({ message: 'User created', user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

module.exports = router;
