const express = require('express');
const pool = require('../config/db');
const router = express.Router();


router.get('/subjectQuestions', async (req, res) => {
    const { subjectID } = req.query;

    try {
        const result = await pool.query(
            'SELECT * FROM questions WHERE subject_id=$1;',
            [subjectID]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;