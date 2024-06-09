const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

router.post('/auth', async (req, res) => {
    const { username, password, firstName, lastName, email, phoneNo } = req.body;

    try {
        // Check if the username already exists
        const existingUsername = await prisma.user.findUnique({
            where: { username: username },
        });

        if (existingUsername) {
            return res.status(409).json({ message: 'Username already taken' });
        }

        // Check if the email already exists
        const existingEmail = await prisma.user.findUnique({
            where: { email: email },
        });

        if (existingEmail) {
            return res.status(409).json({ message: 'Email already taken' });
        }

        // Check if the phone number already exists
        const existingPhoneNo = await prisma.user.findUnique({
            where: { phoneNo: phoneNo },
        });

        if (existingPhoneNo) {
            return res.status(409).json({ message: 'Phone number already taken' });
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
