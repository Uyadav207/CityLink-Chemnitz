const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authenticateJWT = require("../middleware/authMiddleware");

// Get all users
router.get("/", authenticateJWT, async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: { addresses: true, favouriteCategories: true } 
        });
        res.json({ message: "Users retrieved successfully", users });
    } catch (error) {
        res
            .status(500)
            .json({ error: "Cannot fetch users", details: error.message });
    }
});

// Edit user information
router.put("/edit/:id", authenticateJWT, async (req, res) => {
    const { id } = req.params;
    const { username, password, firstName, lastName, phoneNo, email } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { username, password, firstName, lastName, phoneNo, email },
        });
        res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res
            .status(500)
            .json({ error: "Cannot update user", details: error.message });
    }
});

// Delete user (soft delete)
router.delete("/delete/:id", authenticateJWT, async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { isDeleted: true },
        });
        res.json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        res
            .status(500)
            .json({ error: "Cannot delete user", details: error.message });
    }
});

// Lists deleted users
router.get("/deleted", authenticateJWT, async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            where: { isDeleted: true },
            include: { addresses: true, favouriteCategories: true } 
        });

        if (!users) {
            return res.status(404).json({ error: "No Users were Deleted" });
        }

        res.json({ message: "Deleted users retrieved successfully", users });
    } catch (error) {
        res
            .status(500)
            .json({ error: "Cannot fetch deleted users", details: error.message });
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
            data: { userType }
        });
        res.json({ message: 'User type updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Cannot update user type', details: error.message });
    }
});


// Add home adress for a regular or super user
router.post("/address/:userId", authenticateJWT, async (req, res) => {
    const { userId } = req.params;
    const { street, city, state, zipCode, country } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.userType === "REGULAR") {
            const addresses = await prisma.address.findMany({
                where: { userId: parseInt(userId) },
            });
            if (addresses.length >= 1) {
                return res
                    .status(400)
                    .json({ error: "Regular users can only have one address" });
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

        res.json({ message: "Address added successfully", address: newAddress });
    } catch (error) {
        res
            .status(500)
            .json({ error: "Cannot add address", details: error.message });
    }
});


// Add a favourite category for a user
router.post("/favourite-category/:userId", authenticateJWT, async (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.userType === "REGULAR") {
            const favouriteCategories = await prisma.favouriteCategory.findMany({
                where: { userId: parseInt(userId) },
            });
            if (favouriteCategories.length >= 1) {
                return res
                    .status(400)
                    .json({
                        error: "Regular users can only have one favourite category",
                    });
            }
        }

        const newFavouriteCategory = await prisma.favouriteCategory.create({
            data: {
                name,
                userId: parseInt(userId),
            },
        });

        res.json({
            message: "Favourite category added successfully",
            favouriteCategory: newFavouriteCategory,
        });
    } catch (error) {
        res
            .status(500)
            .json({ error: "Cannot add favourite category", details: error.message });
    }
});


module.exports = router;
