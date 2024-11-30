const express = require('express');
const pool = require('../config/db');
const router = express.Router();


router.get('/departments', async (req, res) => {
    const { facultyid } = req.query;

    try {
        const result = await pool.query(
            'SELECT * FROM departments WHERE faculty_id = $1;',
            [facultyid]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/departments', async (req, res) => {
    const { name, facultyID } = req.body;

    if (!name || !facultyID ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO departments (department_name, faculty_id) VALUES ($1, $2)',
            [name, facultyID]
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to create request' });
    }
});


module.exports = router;