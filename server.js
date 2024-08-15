const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.use(express.static('public'));

app.get('/api/currencies', async (req, res) => {
    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch currencies' });
    }
});

app.get('/api/convert', async (req, res) => {
    const { from, to, amount } = req.query;
    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch conversion' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});