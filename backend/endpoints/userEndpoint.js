const express = require('express');
const pool = require('../config/db');
const router = express.Router();


router.post("/users/add-user", async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [email, password]
        );
    } catch(error) {
        console.log(error);
    }
})


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


router.put('/users/changePassword', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if(!email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fiels are required and should be filled.'})
    }

    try {
        const userRows = await pool.query( 
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if( userRows.rowCount !== 1 ) {
            res.status(400).json({ message: "User does not exist" });
        }

        const user = userRows.rows[0];

        if( password !== confirmPassword ) {
            res.status(400).json({ message: "The new password should match with the confirm password" });
        }

        const result = await pool.query(
            "UPDATE users SET password=$1 WHERE email=$2",
            [password, user.email]
        );

        res.status(200).json({ message: "Successfully changed password" });
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Failed to change password" })
    }
})


router.put("/users/completeProfile", async (req, res) => {
    const { userID, firstName, lastName, faculty, department, year, selectedSubjects } = req.body;

    if( !firstName || !lastName || !faculty || !department  || selectedSubjects.length == 0) {
        return res.status(400).json({ message: 'All fiels are required and should be filled.'});
    }

    try {
        const userRows = await pool.query( 
            "SELECT * FROM users WHERE id = $1",
            [userID]
        );

        if( userRows.rowCount !== 1 ) {
            res.status(400).json({ message: "User does not exist" });
        }

        const user = userRows.rows[0];

        const result = await pool.query(
            "UPDATE users SET firstname = $1, lastname = $2, facultyid = $3, department = $4, year = $5, subjects = $6, isprofilecompleted = $7 WHERE id = $8",
            [firstName, lastName, faculty, department, year, selectedSubjects, true, userID]
        );        

        res.status(200).json({ message: "Successfully changed password" });
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Failed to change password" })
    }
})


router.put("/users/modifyProfile", async (req, res) => {
    const { userID, faculty, department, year, selectedSubjects } = req.body;

    console.log(faculty);

    if( !faculty ) {
        return res.status(400).json({ message: 'All fiels are required and should be filled.'});
    }

    try {
        const userRows = await pool.query( 
            "SELECT * FROM users WHERE id = $1",
            [userID]
        );

        if( userRows.rowCount !== 1 ) {
            res.status(400).json({ message: "User does not exist" });
        }

        const result = await pool.query(
            "UPDATE users SET facultyid = $1, department = $2, year = $3, subjects = $4 WHERE id = $5",
            [faculty, department, year, selectedSubjects, userID]
        );        

        res.status(200).json({ message: "Successfully changed profile information" });
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Failed to updated information" })
    }
})


module.exports = router;