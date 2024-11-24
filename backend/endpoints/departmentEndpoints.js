const express = require('express');
const pool = require('../config/db');
const router = express.Router();


router.get('/departments', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM departments;'
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;