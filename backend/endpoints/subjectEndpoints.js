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


router.post('/subjects', async (req, res) => {
    const { name, proffesor, year, semester, labAssistants, isEnabled, departmentID } = req.body;
    
    if ( !name || !proffesor || !year || !semester || !isEnabled || labAssistants.length == 0) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO subjects (name, proffesor, lab_assistants, year, semester, is_enabled, department_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [name, proffesor, labAssistants, year, semester, isEnabled, departmentID]
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to create request' });
    }
})


module.exports = router;