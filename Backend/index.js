const express = require('express');
const connectDB = require('./config/database');
const [ClearTables, Write] = require('./functions/Dev');
const [SignIn, LogIn] = require('./functions/APIFunctions');


const app = express();
app.use(express.json());

connectDB();

app.post('/api/signin', async (req, res) => {
    await SignIn(req, res);
});

app.get('/api/login', async (req, res) => {
    await LogIn(req,res);
});

app.listen(3000, () => {
    console.log('Server je pokrenut na portu 3000');
});

app.post('/dev/brisi', ClearTables);
app.get('/dev/ispisi', async (req, res) => {
    await Write(req, res);
})