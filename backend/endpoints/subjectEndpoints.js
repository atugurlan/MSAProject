const express = require('express');
const pool = require('../config/db');
const router = express.Router();


router.get('/subjects', async (req, res) => {
    const { departmentID } = req.query;

    try {
        const result = await pool.query(
            'SELECT * FROM subjects WHERE department_id=$1;',
            [departmentID]
        );
        res.json(result.rows);

        console.log(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;