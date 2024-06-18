/**
 * @swagger
 * tags:
 *   name: API
 *   description: Various data fetching APIs
 */

/**
 * @swagger
 * /apis/api/schule:
 *   get:
 *     summary: Get all Schulen
 *     tags: [API]
 *     responses:
 *       200:
 *         description: List of Schulen
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 features:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       attributes:
 *                         type: object
 *                       geometry:
 *                         type: object
 *                         properties:
 *                           x:
 *                             type: number
 *                             example: 7.123456
 *                           y:
 *                             type: number
 *                             example: 50.123456
 *       404:
 *         description: Schulen not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Schulen not found
 */

/**
 * @swagger
 * /apis/api/jugendberufshilfe:
 *   get:
 *     summary: Get all Jugendberufshilfe
 *     tags: [API]
 *     responses:
 *       200:
 *         description: List of Jugendberufshilfe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 features:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       attributes:
 *                         type: object
 *                       geometry:
 *                         type: object
 *                         properties:
 *                           x:
 *                             type: number
 *                             example: 7.123456
 *                           y:
 *                             type: number
 *                             example: 50.123456
 *       404:
 *         description: Jugendberufshilfe not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Jugendberufshilfe not found
 */

/**
 * @swagger
 * /apis/api/kindertageseinrichtungen:
 *   get:
 *     summary: Get all Kindertageseinrichtungen
 *     tags: [API]
 *     responses:
 *       200:
 *         description: List of Kindertageseinrichtungen
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 features:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       attributes:
 *                         type: object
 *                       geometry:
 *                         type: object
 *                         properties:
 *                           x:
 *                             type: number
 *                             example: 7.123456
 *                           y:
 *                             type: number
 *                             example: 50.123456
 *       404:
 *         description: Kindertageseinrichtungen not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Kindertageseinrichtungen not found
 */

/**
 * @swagger
 * /apis/api/schulsozialarbeit:
 *   get:
 *     summary: Get all Schulsozialarbeit
 *     tags: [API]
 *     responses:
 *       200:
 *         description: List of Schulsozialarbeit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 features:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       attributes:
 *                         type: object
 *                       geometry:
 *                         type: object
 *                         properties:
 *                           x:
 *                             type: number
 *                             example: 7.123456
 *                           y:
 *                             type: number
 *                             example: 50.123456
 *       404:
 *         description: Schulsozialarbeit not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Schulsozialarbeit not found
 */
