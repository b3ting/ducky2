const express = require('express');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

// API Endpoints
app.post('/api/duckies', async (req, res) => {
    const { location_id, name, owner_id } = req.body;
    try {
        const newDucky = await prisma.duckies.create({
            data: { location_id, name, owner_id },
        });
        res.json(newDucky);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create Ducky' });
    }
});

app.get('/api/duckies', async (req, res) => {
    try {
        const duckies = await prisma.duckies.findMany();
        res.json(duckies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch Duckies' });
    }
});

app.patch('/api/duckies/:id/transfer', async (req, res) => {
    const { id } = req.params;
    const { new_owner_id } = req.body;
    try {
        const updatedDucky = await prisma.duckies.update({
            where: { id: parseInt(id) },
            data: { owner_id: new_owner_id },
        });
        res.json(updatedDucky);
    } catch (error) {
        res.status(500).json({ error: 'Failed to transfer Ducky' });
    }
});

app.get('/api/users/:userID/duckies', async (req, res) => {
    const { userID } = req.params;
    try {
        const userDuckies = await prisma.duckies.findMany({
            where: { owner_id: parseInt(userID) },
        });
        res.json(userDuckies);
    } catch (error) {
        console.error('Failed to fetch Duckies:', error);
        res.status(500).json({ error: 'Failed to fetch Duckies' });
    }
});

const port = process.env.PORT || 3001;
const host = '0.0.0.0';
app.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
}).on('error', (err) => {
    console.error('Server failed to start:', err);
    process.exit(1);
});