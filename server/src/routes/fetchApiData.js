const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get API for Schulen
router.get('/api/schule', async (req, res) => {
    try {
        const schulen = await prisma.schule.findMany();
        res.json(schulen);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Schulen not found' });
    }
});

// Get API for Jugendberufshilfe
router.get('/api/jugendberufshilfe', async (req, res) => {
    try {
        const jugendberufshilfe = await prisma.jugendberufshilfe.findMany();
        res.json(jugendberufshilfe);
    } catch (error) {
        res.status(404).json({ message: 'Jugendberufshilfe not found' });
    }
});

// Get API for Kindertageseinrichtungen
router.get('/api/kindertageseinrichtungen', async (req, res) => {
    try {
        const kindertageseinrichtungen = await prisma.kindertageseinrichtungen.findMany();
        res.json(kindertageseinrichtungen);
    } catch (error) {
        res.status(404).json({ message: 'Kindertageseinrichtungen not found' });
    }
});

// Get API for Schulsozialarbeit
router.get('/api/schulsozialarbeit', async (req, res) => {
    try {
        const schulsozialarbeit = await prisma.schulsozialarbeit.findMany();
        res.json(schulsozialarbeit);
    } catch (error) {
        res.status(404).json({ message: 'Schulsozialarbeit not found' });
    }
});

module.exports = router;
