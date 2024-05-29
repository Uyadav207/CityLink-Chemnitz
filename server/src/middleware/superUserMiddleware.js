const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware to enforce address constraints
const enforceAddressConstraints = async (req, res, next) => {
  const { userId } = req.user;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { addresses: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.userType === 'REGULAR' && user.addresses.length > 0) {
      return res.status(400).json({ error: 'Regular users can only have one address' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Error checking address constraints', details: error.message });
  }
};

module.exports = enforceAddressConstraints;