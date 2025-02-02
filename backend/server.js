const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); 

const app = express();

app.use(bodyParser.json({ limit: '50mb' })); 
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

const PORT = process.env.SERVER_PORT | 3000;
const HOST = process.env.DB_HOST
app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

const requestEndpoints = require('./endpoints/requestEndpoints');
app.use('/api', requestEndpoints);

const userEndpoints = require('./endpoints/userEndpoint');
app.use('/api', userEndpoints);

const facultyEndpoints = require('./endpoints/facultyEndpoints');
app.use('/api', facultyEndpoints);

const departmentEndpoints = require('./endpoints/departmentEndpoints');
app.use('/api', departmentEndpoints);

const subjectEndpoints = require('./endpoints/subjectEndpoints');
app.use('/api', subjectEndpoints);

const questionEndpoints = require('./endpoints/questionsEndpoints');
app.use('/api', questionEndpoints);

const answerEndpoints = require('./endpoints/answerEndpoints');
app.use('/api', answerEndpoints);

const likeEndpoints = require('./endpoints/likeEndpoints');
app.use('/api', likeEndpoints);