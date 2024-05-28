const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateJWT = require('../middleware/authMiddleware');

// Get all users
router.get('/', authenticateJWT, async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json({ message: 'Users retrieved successfully', users });
    } catch (error) {
        res.status(500).json({ error: 'Cannot fetch users', details: error.message });
    }
});

// Edit user information
router.put('/edit/:id', authenticateJWT, async (req, res) => {
    const { id } = req.params;
    const { username, password, firstName, lastName, address, phoneNo, email } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { username, password, firstName, lastName, address, phoneNo, email }
        });
        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Cannot update user', details: error.message });
    }
});

// Delete user (soft delete)
router.delete('/delete/:id', authenticateJWT, async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { isDeleted: true }
        });
        res.json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        res.status(500).json({ error: 'Cannot delete user', details: error.message });
    }
});

// Lists deleted users
router.get('/deleted', authenticateJWT, async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        where: { isDeleted: true },
      });
  
      if (!users) {
        return res.status(404).json({ error: 'No Users were Deleted' });
      }
  
      res.json({ message: 'Deleted users retrieved successfully', users });
    } catch (error) {
      res.status(500).json({ error: 'Cannot fetch deleted users', details: error.message });
    }
  });


module.exports = router;
