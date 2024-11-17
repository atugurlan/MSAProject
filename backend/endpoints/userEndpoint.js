const express = require('express');
const pool = require('../config/db');
const router = express.Router();


router.post("/users/login", async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: 'Input fields were not filled' });
    }

    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if( result.rowCount === 0) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const user = result.rows[0];
        const userPassword = user.password;

        if( password !== userPassword) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        res.status(200).json({ 
            message: "Login successful",
            user: user
        });
    } catch(error) {
        console.log(error);
    }
});

module.exports = router;