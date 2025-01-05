const express = require('express');
const pool = require('../config/db');
const router = express.Router();


router.get('/likes', async (req, res) => {
    const { userID } = req.query;

    try {
        const result = await pool.query(
            'SELECT * FROM likes WHERE user_id = $1;',
            [userID]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/likeQuestion', async (req, res) => {
    const { question_id, user_id } = req.body;

    if (!question_id || !user_id) {
        return res.status(400).json({ message: 'Both question_id and user_id are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO likes (question_id, user_id) VALUES ($1, $2)',
            [question_id, user_id]
        );

        const questionResponse = await pool.query(
            'UPDATE questions SET no_likes = no_likes + 1 WHERE question_id = $1',
            [question_id]
        )

        res.status(200).json({ message: 'Successfully liked the question' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Database error' });
    }
});


router.delete('/unlikeQuestion', async (req, res) => {
    const { question_id, user_id } = req.query;

    if (!question_id || !user_id) {
        return res.status(400).json({ message: 'Both question_id and user_id are required' });
    }

    try {
        const result = await pool.query(
            'DELETE FROM likes WHERE question_id = $1 AND user_id = $2',
            [question_id, user_id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Like not found for the given question and user' });
        }

        const questionResponse = await pool.query(
            'UPDATE questions SET no_likes = no_likes - 1 WHERE question_id = $1',
            [question_id]
        )

        res.status(200).json({ message: 'Successfully unliked the question' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to unlike the question' });
    }
});


module.exports = router;