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


router.post('/question', async (req, res) => {
    const { userId, student_name, subjectId, questionTitle, questionContent, files } = req.body;

    if (!questionTitle || !questionContent) {
        console.log('failed');
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO questions (student_id, student_name, subject_id, question_title, question_content, question_files) VALUES ($1, $2, $3, $4, $5, $6)',
            [userId, student_name, subjectId, questionTitle, questionContent, files]
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to create request' });
    }
});


module.exports = router;