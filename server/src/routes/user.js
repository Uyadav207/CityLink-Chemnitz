const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateJWT = require('../middleware/authMiddleware');

// Get all users
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { addresses: true, favouriteCategories: true },
    });
    res.json({ message: 'Users retrieved successfully', users });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Cannot fetch users', details: error.message });
  }
});

// Edit user information
router.put('/edit/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { username, password, firstName, lastName, phoneNo, email } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { username, password, firstName, lastName, phoneNo, email },
      include: { addresses: true, favouriteCategories: true },
    });
    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Cannot update user', details: error.message });
  }
});

// Delete user (soft delete)
router.delete('/delete/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { isDeleted: true },
    });
    res.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Cannot delete user', details: error.message });
  }
});

// Lists deleted users
router.get('/deleted', authenticateJWT, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { isDeleted: true },
      include: { addresses: true, favouriteCategories: true },
    });

    if (!users) {
      return res.status(404).json({ error: 'No Users were Deleted' });
    }

    res.json({ message: 'Deleted users retrieved successfully', users });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Cannot fetch deleted users', details: error.message });
  }
});

// Change user type
router.put('/change-type/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { userType } = req.body;
  if (!['REGULAR', 'SUPER'].includes(userType)) {
    return res.status(400).json({ error: 'Invalid user type' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { userType },
      include: { addresses: true, favouriteCategories: true },
    });
    res.json({ message: 'User type updated successfully', user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Cannot update user type', details: error.message });
  }
});

// Add home adress for a regular or super user
router.post('/address/:userId', authenticateJWT, async (req, res) => {
  const { userId } = req.params;
  const { street, city, state, zipCode, country } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.userType === 'REGULAR') {
      const addresses = await prisma.address.findMany({
        where: { userId: parseInt(userId) },
      });
      if (addresses.length >= 1) {
        return res
          .status(400)
          .json({ error: 'Regular users can only have one address' });
      }
    }

    const newAddress = await prisma.address.create({
      data: {
        street,
        city,
        state,
        zipCode,
        country,
        userId: parseInt(userId),
      },
    });

    res.json({ message: 'Address added successfully', address: newAddress });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Cannot add address', details: error.message });
  }
});

// Add a favourite facility for a user
router.post('/favourite/facility/:userId', authenticateJWT, async (req, res) => {
  const { userId } = req.params;
  const { category, objectId } = req.body;

  try {
      // Check if the user exists
      const user = await prisma.user.findUnique({
          where: { id: parseInt(userId) },
      });

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Check if the user already has a favourite Facility
      const existingFavouriteFacility = await prisma.favouriteFacility.findFirst({
          where: { userId: parseInt(userId) }
      });

      if (existingFavouriteFacility) {
          return res.status(400).json({ error: 'User already has a favourite facility' });
      }

      // Add the new favourite facility
      const newFavouriteFacility = await prisma.favouriteFacility.create({
          data: {
              category,
              objectID: parseInt(objectId),
              userId: parseInt(userId),
          },
      });

      res.json({
          message: 'Favourite facility added successfully',
          favouriteFacility: newFavouriteFacility,
      });
  } catch (error) {
      res.status(500).json({
          error: 'Cannot add favourite facility',
          details: error.message,
      });
  }
});

// Delete a favourite facility for a user
router.delete('/favourite/facility/:userId', authenticateJWT, async (req, res) => {
  const { userId } = req.params;

  try {
      // Check if the user exists
      const user = await prisma.user.findUnique({
          where: { id: parseInt(userId) },
      });

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Check if the user has a favourite facility
      const favouriteFacility = await prisma.favouriteFacility.findFirst({
          where: { userId: parseInt(userId) }
      });

      if (!favouriteFacility) {
          return res.status(404).json({ error: 'Favourite facility not found for this user' });
      }

      // Delete the favourite facility
      await prisma.favouriteFacility.delete({
          where: { id: favouriteFacility.id }
      });

      res.json({
          message: 'Favourite facility deleted successfully'
      });
  } catch (error) {
      res.status(500).json({
          error: 'Cannot delete favourite facility',
          details: error.message,
      });
  }
});


module.exports = router;
