/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /user/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID
 *                     example: 1
 *                   username:
 *                     type: string
 *                     description: The user's username
 *                     example: johndoe
 *                   firstName:
 *                     type: string
 *                     description: The user's first name
 *                     example: John
 *                   lastName:
 *                     type: string
 *                     description: The user's last name
 *                     example: Doe
 */

/**
 * @swagger
 * /user/edit/{id}:
 *   put:
 *     summary: Edit user information
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNo:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       500:
 *         description: Cannot update user
 */

/**
 * @swagger
 * /user/edit/address/{userId}:
 *   put:
 *     summary: Edit user address
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Address updated successfully
 *       500:
 *         description: Cannot update address
 */

/**
 * @swagger
 * /user/delete/address/{userId}/{addressId}:
 *   delete:
 *     summary: Delete user address
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *       - in: path
 *         name: addressId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The address ID
 *     responses:
 *       200:
 *         description: Address deleted successfully
 *       500:
 *         description: Cannot delete address
 */

/**
 * @swagger
 * /user/delete/{id}:
 *   delete:
 *     summary: Delete user (soft delete)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       500:
 *         description: Cannot delete user
 */

/**
 * @swagger
 * /user/deleted:
 *   get:
 *     summary: Lists deleted users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Deleted users retrieved successfully
 *       500:
 *         description: Cannot fetch deleted users
 */

/**
 * @swagger
 * /user/change-type/{id}:
 *   put:
 *     summary: Change user type
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userType:
 *                 type: string
 *                 enum: [REGULAR, SUPER]
 *     responses:
 *       200:
 *         description: User type updated successfully
 *       500:
 *         description: Cannot update user type
 */

/**
 * @swagger
 * /user/address/{userId}:
 *   post:
 *     summary: Add home address for a regular or super user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Address added successfully
 *       500:
 *         description: Cannot add address
 */

/**
 * @swagger
 * /user/favourite/facility/{userId}:
 *   post:
 *     summary: Toggle favourite facility for a user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *               objectId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Favourite facility toggled successfully
 *       500:
 *         description: Cannot toggle favourite facility
 */
