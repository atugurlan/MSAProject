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


router.get('/question', async (req, res) => {
    const { questionId } = req.query;

    try {
        const result = await pool.query(
           `SELECT student_name, question_title, question_content FROM questions WHERE question_id=$1`,
           [questionId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const question = result.rows[0];

        const filesResult = await pool.query(
            `SELECT file_type, ENCODE(file_data, 'base64') AS file_data FROM files WHERE question_id = $1`,
            [questionId]
        );

        question.files = filesResult.rows;

        res.json(question);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to create request' });
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
            `INSERT INTO questions (student_id, student_name, subject_id, question_title, question_content) 
             VALUES ($1, $2, $3, $4, $5) RETURNING question_id`,
            [userId, student_name, subjectId, questionTitle, questionContent]
        );

        const questionId = result.rows[0].question_id;

        if (files && files.length > 0) {
            for (const file of files) {
                await pool.query(
                    `INSERT INTO files (question_id, file_type, file_data) 
                     VALUES ($1, $2, $3)`,
                    [questionId, file.type, Buffer.from(file.base64, 'base64')]
                );
            }
        }

        res.status(201).json({ message: 'Question created successfully', questionId });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to create request' });
    }
});


module.exports = router;