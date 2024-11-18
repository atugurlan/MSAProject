const express = require('express');
const pool = require('../config/db');
const router = express.Router();


router.get('/requests', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, email, password, ENCODE(studentdocument, 'base64') AS studentdocument, status FROM requests`
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/requests', async (req, res) => {
    const { email, password, photo } = req.body;

    if (!email || !password || !photo) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const photoBuffer = Buffer.from(photo, 'base64');

        const result = await pool.query(
            'INSERT INTO requests (email, password, studentdocument) VALUES ($1, $2, $3) RETURNING *',
            [email, password, photoBuffer]
        );
        res.status(201).json({ message: 'Request created successfully', request: result.rows[0] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to create request' });
    }
});

module.exports = router;