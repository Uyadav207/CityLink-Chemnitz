const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

router.post('/recover', async (req, res) => {
    const { username, password, email } = req.body;

    try {

        // Find the user based on the provided username and email
        const user = await prisma.user.findFirst({
            where: { username, email },
        });

        // If the user is not found or the account is not marked as deleted, return an error
        if (!user || !user.isDeleted) {
            return res.status(400).json({ error: 'Invalid username, email, or account not deleted' });
        }

        // Check if the provided password matches the user's hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Update the isDeleted field to false to recover the account
        await prisma.user.update({
            where: { id: user.id },
            data: { isDeleted: false },
        });

        // Return a success message
        return res.json({ message: 'Account recovered successfully' });
    } catch (error) {
        console.error('Error recovering account:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
