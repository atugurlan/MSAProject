const express = require('express');
const pool = require('../config/db');
const router = express.Router();


router.get('/answers', async (req, res) => {
    const { questionID } = req.query;

    try {
        const result = await pool.query(
            'SELECT * FROM answers WHERE question_id = $1;',
            [questionID]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;