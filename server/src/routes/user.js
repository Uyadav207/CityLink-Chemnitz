const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateJWT = require('../middleware/authMiddleware');

// Get all users
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { addresses: true, favouriteFacilities: true },
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
      include: { addresses: true, favouriteFacilities: true } ,
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
      include: { addresses: true, favouriteFacilities: true } ,
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
      include: { addresses: true, favouriteFacilities: true } ,
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
          .status(409)
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


    const updatedUser = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: { addresses: true, favouriteFacilities: true },
    });

    res.json({ message: 'Address added sucy', updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Cannot add address', details: error.message });
  }
});


// Toggle favourite facility for a user
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

    // Check if the facility is already favourited
    const existingFavourite = await prisma.favouriteFacility.findFirst({
      where: {
        userId: parseInt(userId),
        objectID: parseInt(objectId),
        category,
      },
    });

    if (existingFavourite) {
      // If it is already favourited, remove it
      await prisma.favouriteFacility.delete({
        where: { id: existingFavourite.id },
      });

      // Fetch the updated user details
      const updatedUser = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        include: { addresses: true, favouriteFacilities: true },
      });

      return res.status(200).json({
        message: 'Favourite facility removed successfully',
        updatedUser,
      });
    }

    // Check user type and number of favourite facilities for REGULAR users
    if (user.userType === 'REGULAR') {
      const favouriteFacilities = await prisma.favouriteFacility.findMany({
        where: { userId: parseInt(userId) },
      });

      if (favouriteFacilities.length >= 1) {
        return res.status(403).json({ message: 'Regular user can only have one favourite facility. Please delete the existing favourite before adding a new one.' });
      }
    }

    // Add the new favourite facility
    const newFavouriteFacility = await prisma.favouriteFacility.create({
      data: {
        category,
        objectID: parseInt(objectId),
        userId: parseInt(userId),
      },
    });

    // Fetch the updated user details
    const updatedUser = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: { addresses: true, favouriteFacilities: true },
    });

    res.status(201).json({
      message: 'Favourite facility added successfully',
      favouriteFacility: newFavouriteFacility,
      updatedUser,
    });

  } catch (error) {
    res.status(500).json({
      error: 'Cannot toggle favourite facility',
      details: error.message,
    });
  }
});

module.exports = router;