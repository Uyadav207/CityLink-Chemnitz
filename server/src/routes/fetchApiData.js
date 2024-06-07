const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get API for Schulen
router.get('/api/schule', async (req, res) => {
    try {
        const schulen = await prisma.schule.findMany();
        const responseSchule = {
            features: schulen.map(({ x, y, ...attributes }) => ({
                attributes,
                geometry: { x, y }
            }))
        };
        res.json(responseSchule);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Schulen not found' });
    }
});



// Get API for Jugendberufshilfe
router.get('/api/jugendberufshilfe', async (req, res) => {
    try {
        const jugendberufshilfen = await prisma.jugendberufshilfe.findMany();
        const responseJugendberufshilfe = {
           features: jugendberufshilfen.map(({ x, y, ...attributes }) => ({
            attributes,
            geometry: { x, y }
        }))
    };
        res.json(responseJugendberufshilfe);
    } catch (error) {
        res.status(404).json({ message: 'Jugendberufshilfe not found' });
    }
});


// Get API for Kindertageseinrichtungen
router.get('/api/kindertageseinrichtungen', async (req, res) => {
    try {
        const kindertageseinrichtungen = await prisma.kindertageseinrichtungen.findMany();
        const responseKindertageseinrichtungen = {
            features: kindertageseinrichtungen.map(({ x, y, ...attributes }) => ({
                attributes,
                geometry: { x, y }
            }))
        };
        res.json(responseKindertageseinrichtungen);
    } catch (error) {
        res.status(404).json({ message: 'Kindertageseinrichtungen not found' });
    }
});

// Get API for Schulsozialarbeit
router.get('/api/schulsozialarbeit', async (req, res) => {
    try {
        const schulsozialarbeiten = await prisma.schulsozialarbeit.findMany();
        const responseSchulsozialarbeit = {
            features: schulsozialarbeiten.map(({ x, y, ...attributes }) => ({
                attributes,
                geometry: { x, y }
            }))
        };
        res.json(responseSchulsozialarbeit);
    } catch (error) {
        res.status(404).json({ message: 'Schulsozialarbeit not found' });
    }
});

module.exports = router;
