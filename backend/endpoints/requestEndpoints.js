const express = require('express');
const pool = require('../config/db');
const router = express.Router();


router.get('/requests', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, email, password, ENCODE(studentdocument, 'base64') AS studentdocument, status FROM requests ORDER BY id;`
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


router.put('/requests', async (req, res) => {
    const { id, newStatus } = req.body;

    try {
        const requestRow = await pool.query(
            "SELECT * FROM requests WHERE id = $1",
            [id]
        );

        if( requestRow.rowCount !== 1) {
            res.status(400).json({ message: "Request does not exist" });
        }

        await pool.query(
            "UPDATE requests SET status=$1 WHERE id=$2",
            [newStatus, id]
        );

        res.status(200).json({ message: "Successfully changed the status of the request" });
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Failed to change password" });
    }
})

module.exports = router;