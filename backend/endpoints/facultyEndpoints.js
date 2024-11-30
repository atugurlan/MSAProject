const express = require('express');
const pool = require('../config/db');
const router = express.Router();


router.get('/faculties', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM faculties;'
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/faculties', async (req, res) => {
    const { name, shortName } = req.body;

    if (!name || !shortName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO faculties (name, shortname) VALUES ($1, $2)',
            [name, shortName]
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to create request' });
    }
});


router.delete('faculties', async (req, res) => {
    const { id } = req.body;

    if(!id) {
        return res.status(400).json({ message: 'Could not find the faculty with the id' });
    }

    try {
        const result = await pool.query(
            'DELETE FROM faculties WHERE id = $1',
            [id]
        )

        if( result.rowCount === 0 ) {
            return res.status(404).json({ message: 'Could not find the faculty' });
        }

        res.status(200).json({ message: 'Successfully deleted' });
    } catch(error) {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to delete the faculty' });
    }
});


module.exports = router;